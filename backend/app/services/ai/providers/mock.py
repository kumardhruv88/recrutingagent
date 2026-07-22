from typing import Any, Dict, List
import json
from app.services.ai.providers.base import AIProviderProtocol


class MockAIProvider:
    """
    Deterministic mock provider for safe offline testing and development.
    """

    @property
    def name(self) -> str:
        return "mock"

    @property
    def default_model(self) -> str:
        return "mock-v1"

    async def generate(
        self, prompt: str, model: str = "", **kwargs: Any
    ) -> Dict[str, Any]:
        # Return deterministic JSON structure based on prompt or just a generic success
        result_content = "Mock response generated successfully."

        # If the task requires structured JSON (simulated based on kwargs or prompt heuristics)
        if kwargs.get("response_format") == "json" or "parse" in prompt.lower():
            result_content = json.dumps(
                {
                    "status": "success",
                    "mocked_data": True,
                    "summary": "This is a mock summary.",
                }
            )

        return {
            "result": result_content,
            "input_tokens": 10,
            "output_tokens": 15,
            "metadata": {"mock": True},
        }

    async def embed(self, text: str, model: str = "", **kwargs: Any) -> List[float]:
        # Return a standard 1536-dimensional mock vector
        return [0.01] * 1536

    async def health_check(self) -> bool:
        return True
