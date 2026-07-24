import pytest
from unittest.mock import AsyncMock
from sqlalchemy.ext.asyncio import AsyncSession

from tests.factories.data_factories import (
    UserFactory,
    OrganizationFactory,
    CandidateFactory,
    JobFactory,
    InterviewFactory,
)


@pytest.fixture
def mock_db_session():
    """Returns a mocked SQLAlchemy AsyncSession."""
    return AsyncMock(spec=AsyncSession)


@pytest.fixture
def test_user():
    """Returns a fake recruiter user dict."""
    return UserFactory.build(role="recruiter")


@pytest.fixture
def test_admin():
    """Returns a fake admin user dict."""
    return UserFactory.build(role="admin")


@pytest.fixture
def test_organization():
    """Returns a fake organization dict."""
    return OrganizationFactory.build()


@pytest.fixture
def test_candidate():
    """Returns a fake candidate dict."""
    return CandidateFactory.build()


@pytest.fixture
def test_job():
    """Returns a fake job dict."""
    return JobFactory.build()


@pytest.fixture
def test_interview():
    """Returns a fake interview dict."""
    return InterviewFactory.build()
