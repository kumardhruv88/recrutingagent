from typing import Dict, Optional, Any
from app.services.ai.providers.base import AIProviderProtocol
from app.services.ai.exceptions import ProviderNotFoundError, PromptNotFoundError
from app.schemas.ai import AITaskType


class ProviderRegistry:
    """Registry to manage and resolve AI providers dynamically."""

    def __init__(self) -> None:
        self._providers: Dict[str, AIProviderProtocol] = {}
        self._default_provider: Optional[str] = None

    def register(self, provider: AIProviderProtocol, is_default: bool = False) -> None:
        self._providers[provider.name] = provider
        if is_default or not self._default_provider:
            self._default_provider = provider.name

    def resolve(self, name: Optional[str] = None) -> AIProviderProtocol:
        target = name or self._default_provider
        if not target or target not in self._providers:
            raise ProviderNotFoundError(f"Provider '{target}' is not registered.")
        return self._providers[target]


class PromptRegistry:
    """Registry to manage prompt templates externally."""

    def __init__(self) -> None:
        self._prompts: Dict[AITaskType, str] = {}
        # Pre-seed some default prompts for known tasks
        self._prompts[AITaskType.RESUME_PARSE] = (
            "Extract the following resume into JSON format:\n\n{text}"
        )
        self._prompts[AITaskType.GITHUB_SUMMARY] = (
            "Summarize this GitHub profile and repositories:\n\n{text}"
        )
        self._prompts[AITaskType.CANDIDATE_SUMMARY] = (
            "Summarize this candidate profile:\n\n{text}"
        )
        self._prompts[AITaskType.INTERVIEW_QUESTIONS] = (
            "Generate interview questions for a candidate with skills: {skills}"
        )

    def register(self, task_type: AITaskType, template: str) -> None:
        self._prompts[task_type] = template

    def get_prompt(self, task_type: AITaskType, **kwargs: Any) -> str:
        if task_type not in self._prompts:
            raise PromptNotFoundError(
                f"No prompt template registered for task: {task_type}"
            )

        template = self._prompts[task_type]
        try:
            return template.format(**kwargs)
        except KeyError as e:
            raise PromptNotFoundError(f"Missing variable for prompt formatting: {e}")
