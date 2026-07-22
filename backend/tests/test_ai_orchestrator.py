import pytest
from typing import Dict, Any, List

from app.schemas.ai import AITaskType, AIResponse
from app.services.ai.exceptions import (
    ProviderNotFoundError,
    PromptNotFoundError,
    AIExecutionError,
)
from app.services.ai.providers.mock import MockAIProvider
from app.services.ai.providers.base import AIProviderProtocol
from app.services.ai.registry import ProviderRegistry, PromptRegistry
from app.services.ai.router import AITaskRouter
from app.services.ai.orchestrator import AIOrchestratorService


class FailingProvider:
    @property
    def name(self) -> str:
        return "failing"

    @property
    def default_model(self) -> str:
        return "fail-v1"

    async def generate(
        self, prompt: str, model: str = "", **kwargs: Any
    ) -> Dict[str, Any]:
        raise ValueError("Simulated provider failure")

    async def embed(self, text: str, model: str = "", **kwargs: Any) -> List[float]:
        raise ValueError("Simulated provider failure")

    async def health_check(self) -> bool:
        return False


@pytest.fixture
def orchestrator() -> AIOrchestratorService:
    provider_registry = ProviderRegistry()
    mock_provider = MockAIProvider()
    failing_provider = FailingProvider()

    provider_registry.register(mock_provider, is_default=True)
    provider_registry.register(failing_provider)

    prompt_registry = PromptRegistry()
    # It already comes pre-seeded with some prompts

    router = AITaskRouter()

    return AIOrchestratorService(provider_registry, prompt_registry, router)


@pytest.mark.asyncio
async def test_provider_registry_resolve() -> None:
    registry = ProviderRegistry()
    mock = MockAIProvider()
    registry.register(mock, is_default=True)

    resolved = registry.resolve()
    assert resolved.name == "mock"

    resolved_named = registry.resolve("mock")
    assert resolved_named.name == "mock"

    with pytest.raises(ProviderNotFoundError):
        registry.resolve("non_existent")


def test_prompt_registry_formatting() -> None:
    registry = PromptRegistry()
    registry.register(AITaskType.RESUME_PARSE, "Hello {name}")

    prompt = registry.get_prompt(AITaskType.RESUME_PARSE, name="Alice")
    assert prompt == "Hello Alice"

    with pytest.raises(PromptNotFoundError):
        registry.get_prompt(AITaskType.RESUME_PARSE)  # Missing variable 'name'


@pytest.mark.asyncio
async def test_orchestrator_execution(orchestrator: AIOrchestratorService) -> None:
    # Uses mock provider by default for RESUME_PARSE
    response = await orchestrator.execute_task(
        task_type=AITaskType.RESUME_PARSE,
        variables={"text": "Software Engineer with 5 years experience"},
    )

    assert isinstance(response, AIResponse)
    assert response.provider == "mock"
    assert response.task == AITaskType.RESUME_PARSE
    assert response.result is not None
    assert response.input_tokens == 10


@pytest.mark.asyncio
async def test_orchestrator_embedding(orchestrator: AIOrchestratorService) -> None:
    response = await orchestrator.generate_embedding("Test text")

    assert isinstance(response, AIResponse)
    assert response.provider == "mock"
    assert response.task == AITaskType.EMBEDDING_GENERATION
    assert len(response.result) == 1536
    assert response.result[0] == 0.01


@pytest.mark.asyncio
async def test_orchestrator_error_handling(orchestrator: AIOrchestratorService) -> None:
    # Route RESUME_PARSE to the failing provider temporarily
    orchestrator.router._routes[AITaskType.RESUME_PARSE] = ("failing", None)

    with pytest.raises(AIExecutionError) as exc_info:
        await orchestrator.execute_task(
            task_type=AITaskType.RESUME_PARSE, variables={"text": "Test"}
        )
    assert "Simulated provider failure" in str(exc_info.value)
