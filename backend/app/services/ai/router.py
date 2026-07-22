from typing import Optional, Dict
from app.schemas.ai import AITaskType


class AITaskRouter:
    """
    Determines the best provider and model for a given task type.
    This keeps the orchestrator decoupled from specific model decisions.
    """

    def __init__(self) -> None:
        # Map task -> (provider_name, model_name)
        self._routes: Dict[AITaskType, tuple[Optional[str], Optional[str]]] = {}

        # Define specific overrides here (e.g. embeddings might go to a specific model)
        self._routes[AITaskType.EMBEDDING_GENERATION] = (
            "mock",
            "text-embedding-ada-002-mock",
        )

    def get_route(self, task_type: AITaskType) -> tuple[Optional[str], Optional[str]]:
        """
        Returns (provider_name, model_name)
        If None, the orchestrator should fall back to the default provider/model.
        """
        return self._routes.get(task_type, (None, None))
