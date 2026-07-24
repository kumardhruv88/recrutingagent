import pytest
from unittest.mock import AsyncMock

@pytest.fixture
def mock_ai_service():
    mock = AsyncMock()
    mock.generate_response.return_value = {"content": "Mocked AI Response", "status": "success"}
    mock.analyze_resume.return_value = {"skills": ["Python", "React"], "experience": 5}
    return mock

@pytest.fixture
def mock_email_service():
    mock = AsyncMock()
    mock.send_email.return_value = True
    return mock

@pytest.fixture
def mock_calendar_service():
    mock = AsyncMock()
    mock.schedule_event.return_value = {"event_id": "mock_event_id", "status": "scheduled"}
    return mock

@pytest.fixture
def mock_github_service():
    mock = AsyncMock()
    mock.get_user_profile.return_value = {"login": "mockuser", "public_repos": 10}
    mock.get_repos.return_value = [{"name": "mockrepo", "language": "Python"}]
    return mock
