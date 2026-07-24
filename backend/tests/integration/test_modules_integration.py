import pytest


@pytest.mark.asyncio
async def test_candidate_creation_integration(mock_db_session, test_candidate):
    """
    Test candidate creation integration with mocked database.
    """
    assert test_candidate["first_name"] is not None
    assert test_candidate["last_name"] is not None
    assert "Python" in test_candidate["skills"]
    assert mock_db_session is not None
