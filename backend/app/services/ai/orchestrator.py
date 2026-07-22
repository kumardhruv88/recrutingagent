import time
from typing import Dict, Any, Optional

from app.schemas.ai import AITaskType, AIResponse
from app.services.ai.registry import ProviderRegistry, PromptRegistry
from app.services.ai.router import AITaskRouter
from app.services.ai.exceptions import AIExecutionError, ProviderUnavailableError


class AIOrchestratorService:
    """
    The centralized orchestrator for executing AI tasks.
    Coordinates between Router, Prompt Registry, and Provider Registry.
    """

    def __init__(
        self,
        provider_registry: ProviderRegistry,
        prompt_registry: PromptRegistry,
        router: AITaskRouter,
    ) -> None:
        self.provider_registry = provider_registry
        self.prompt_registry = prompt_registry
        self.router = router

    async def execute_task(
        self, task_type: AITaskType, variables: Dict[str, Any]
    ) -> AIResponse:
        """Executes a generative task."""
        # 1. Routing
        provider_name, model_override = self.router.get_route(task_type)
        provider = self.provider_registry.resolve(provider_name)
        model = model_override or provider.default_model

        # 2. Prompt Construction
        prompt_text = self.prompt_registry.get_prompt(task_type, **variables)

        # 3. Execution
        start_time = time.time()
        try:
            # Check health if necessary, but typically we just run it and catch exceptions
            response_dict = await provider.generate(prompt=prompt_text, model=model)
        except Exception as e:
            raise AIExecutionError(
                f"Provider {provider.name} failed to execute task: {str(e)}"
            )

        execution_time_ms = int((time.time() - start_time) * 1000)

        # 4. Standardized Response
        return AIResponse(
            task=task_type,
            provider=provider.name,
            model=model,
            execution_time_ms=execution_time_ms,
            input_tokens=response_dict.get("input_tokens"),
            output_tokens=response_dict.get("output_tokens"),
            result=response_dict.get("result"),
            metadata=response_dict.get("metadata", {}),
        )

    async def generate_embedding(self, text: str) -> AIResponse:
        """Executes an embedding generation task."""
        task_type = AITaskType.EMBEDDING_GENERATION

        provider_name, model_override = self.router.get_route(task_type)
        provider = self.provider_registry.resolve(provider_name)
        model = model_override or provider.default_model

        start_time = time.time()
        try:
            vector = await provider.embed(text=text, model=model)
        except Exception as e:
            raise AIExecutionError(
                f"Provider {provider.name} failed embedding: {str(e)}"
            )

        execution_time_ms = int((time.time() - start_time) * 1000)

        return AIResponse(
            task=task_type,
            provider=provider.name,
            model=model,
            execution_time_ms=execution_time_ms,
            result=vector,
            metadata={},
        )
