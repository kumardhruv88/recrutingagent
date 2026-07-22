from typing import Any
import structlog


def get_logger() -> Any:
    """
    Dependency that provides a request-scoped structured logger.
    """
    return structlog.get_logger()
