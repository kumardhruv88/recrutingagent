import pytest


@pytest.mark.asyncio
async def test_ai_orchestrator_mock(mock_ai_service):
    """
    Test that the mock AI service works correctly in unit tests.
    """
    response = await mock_ai_service.generate_response("Test prompt")
    assert response["status"] == "success"
    assert response["content"] == "Mocked AI Response"

    resume_analysis = await mock_ai_service.analyze_resume("Resume text")
    assert "Python" in resume_analysis["skills"]
    assert resume_analysis["experience"] == 5
