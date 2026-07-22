import pytest
from unittest.mock import AsyncMock, MagicMock
from uuid import uuid4
from datetime import datetime, UTC
from typing import Any

from fastapi.testclient import TestClient

from app.main import app
from app.models.auth import User, Organization
from app.models.audit import AuditLog
from app.services.observability.audit import (
    AuditLogger,
    mask_sensitive_dict,
    audit_logger,
)
from app.middleware.metrics import metrics_tracker
from app.dependencies.auth import get_current_organization, require_authenticated_user
from app.dependencies.database import get_db_session

test_user = User(id=uuid4(), clerk_user_id="user_obs_123")
test_org = Organization(
    id=uuid4(),
    clerk_organization_id="org_obs_123",
    name="Obs Org",
    slug="obs-org",
    is_active=True,
    created_at=datetime.now(UTC),
    updated_at=datetime.now(UTC),
)


@pytest.fixture
def override_dependencies(monkeypatch: Any) -> Any:
    app.dependency_overrides[get_current_organization] = lambda: test_org
    app.dependency_overrides[require_authenticated_user] = lambda: test_user
    from app.services.authorization import authorization_service

    monkeypatch.setattr(authorization_service, "require_permissions", AsyncMock())

    async def mock_get_db_session() -> Any:
        session = MagicMock()
        session.execute = AsyncMock()
        session.commit = AsyncMock()
        session.refresh = AsyncMock()
        session.add = MagicMock()
        yield session

    app.dependency_overrides[get_db_session] = mock_get_db_session
    yield
    app.dependency_overrides.clear()


def test_sensitive_masking() -> None:
    data = {
        "username": "john_doe",
        "password": "SecretPassword123!",
        "api_key": "sk-12345",
        "nested": {
            "jwt_token": "eyJhbGciOi...",
            "normal_key": "value",
        },
    }
    masked = mask_sensitive_dict(data)
    assert masked is not None
    assert masked["username"] == "john_doe"
    assert masked["password"] == "***MASKED***"
    assert masked["api_key"] == "***MASKED***"
    assert masked["nested"]["jwt_token"] == "***MASKED***"
    assert masked["nested"]["normal_key"] == "value"


@pytest.mark.asyncio
async def test_audit_logger() -> None:
    logger = AuditLogger()
    db_mock = MagicMock()
    db_mock.commit = AsyncMock()
    db_mock.refresh = AsyncMock()
    db_mock.add = MagicMock()

    log_entry = await logger.log_action(
        db=db_mock,
        action="CANDIDATE_CREATED",
        organization_id=test_org.id,
        user_id="user_123",
        resource_type="candidate",
        resource_id="cand_456",
        details={"name": "Jane", "secret_key": "hidden"},
        ip_address="127.0.0.1",
        correlation_id="corr-test-123",
    )

    assert log_entry.action == "CANDIDATE_CREATED"
    assert log_entry.organization_id == test_org.id
    assert (
        log_entry.details is not None
        and log_entry.details["secret_key"] == "***MASKED***"
    )
    assert log_entry.correlation_id == "corr-test-123"


def test_health_endpoints(override_dependencies: Any) -> None:
    client = TestClient(app)

    # Test /health
    res_health = client.get("/api/v1/health/health")
    assert res_health.status_code == 200
    data_health = res_health.json()["data"]
    assert data_health["status"] == "ok"
    assert "version" in data_health
    assert "uptime_seconds" in data_health

    # Test /ready
    res_ready = client.get("/api/v1/health/ready")
    assert res_ready.status_code == 200
    data_ready = res_ready.json()["data"]
    assert data_ready["database"] == "connected"
    assert data_ready["ai_provider"] == "available"
    assert data_ready["worker"] == "available"


def test_correlation_id_and_metrics_middleware(override_dependencies: Any) -> None:
    client = TestClient(app)

    custom_corr_id = "custom-corr-id-999"
    response = client.get(
        "/api/v1/health/health", headers={"X-Correlation-ID": custom_corr_id}
    )

    assert response.status_code == 200
    assert response.headers.get("X-Correlation-ID") == custom_corr_id
    assert "X-Process-Time-Ms" in response.headers

    # Test /metrics
    res_metrics = client.get("/api/v1/observability/metrics")
    assert res_metrics.status_code == 200
    metrics = res_metrics.json()
    assert metrics["total_requests"] >= 1
    assert "GET /api/v1/health/health" in metrics["endpoints"]


def test_audit_logs_api(override_dependencies: Any, monkeypatch: Any) -> None:
    mock_log = AuditLog(
        id=uuid4(),
        organization_id=test_org.id,
        user_id="user_obs_123",
        action="JOB_CREATED",
        resource_type="job",
        resource_id="job_789",
        details={"title": "Tech Lead"},
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
    )

    mock_query = AsyncMock(return_value=[mock_log])
    monkeypatch.setattr(audit_logger, "query_logs", mock_query)

    client = TestClient(app)
    response = client.get("/api/v1/observability/audit?action=JOB_CREATED")

    assert response.status_code == 200
    logs = response.json()
    assert len(logs) == 1
    assert logs[0]["action"] == "JOB_CREATED"
    assert logs[0]["resource_type"] == "job"
