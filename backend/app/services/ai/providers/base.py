from typing import Protocol, List, Any, Dict


class AIProviderProtocol(Protocol):
    """
    Standard interface for all AI Providers (e.g. OpenAI, Anthropic, Mock).
    """

    @property
    def name(self) -> str:
        """The identifier name of the provider."""
        ...

    @property
    def default_model(self) -> str:
        """The default model to use if none is specified."""
        ...

    async def generate(
        self, prompt: str, model: str = "", **kwargs: Any
    ) -> Dict[str, Any]:
        """
        Execute a text generation task based on the prompt.
        Must return a dictionary containing at least:
        - "result": The text or structured result
        - "input_tokens": (optional)
        - "output_tokens": (optional)
        - "metadata": (optional)
        """
        ...

    async def embed(self, text: str, model: str = "", **kwargs: Any) -> List[float]:
        """
        Execute an embedding task and return a float vector.
        """
        ...

    async def health_check(self) -> bool:
        """
        Verify the provider is accessible and properly configured.
        """
        ...
