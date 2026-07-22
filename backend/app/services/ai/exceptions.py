class AIOrchestratorException(Exception):
    """Base exception for all AI Orchestrator errors."""

    pass


class ProviderUnavailableError(AIOrchestratorException):
    """Raised when the selected AI provider is unavailable or down."""

    pass


class PromptNotFoundError(AIOrchestratorException):
    """Raised when a prompt template for a given task type is not found."""

    pass


class AIExecutionError(AIOrchestratorException):
    """Raised when the AI provider fails to execute the prompt properly."""

    pass


class ProviderNotFoundError(AIOrchestratorException):
    """Raised when a requested provider is not registered."""

    pass
