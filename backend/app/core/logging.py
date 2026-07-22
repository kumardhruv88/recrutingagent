import logging
import sys
from contextvars import ContextVar
from typing import Any

import structlog

from app.core.config import get_settings

# ContextVars to store request lifecycle context
request_id_ctx_var: ContextVar[str] = ContextVar("request_id", default="")
correlation_id_ctx_var: ContextVar[str] = ContextVar("correlation_id", default="")


def add_request_context(
    logger: structlog.types.WrappedLogger, method_name: str, event_dict: dict[str, Any]
) -> dict[str, Any]:
    """
    Injects request_id and correlation_id into the log event from ContextVars.
    """
    request_id = request_id_ctx_var.get()
    if request_id:
        event_dict["request_id"] = request_id

    correlation_id = correlation_id_ctx_var.get()
    if correlation_id:
        event_dict["correlation_id"] = correlation_id

    return event_dict


def setup_logging() -> None:
    """
    Configures structured logging across the application.
    Uses JSON formatting for production, and rich console output for development.
    """
    settings = get_settings()

    log_level = getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO)

    # Base processors common to both environments
    shared_processors: list[Any] = [
        structlog.stdlib.add_log_level,
        structlog.stdlib.add_logger_name,
        structlog.processors.TimeStamper(fmt="iso"),
        add_request_context,
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
    ]

    # Environment-specific formatters
    if settings.ENVIRONMENT.lower() == "production":
        processors = shared_processors + [
            structlog.processors.dict_tracebacks,
            structlog.processors.JSONRenderer(),
        ]
    else:
        processors = shared_processors + [
            structlog.dev.ConsoleRenderer(),
        ]

    structlog.configure(
        processors=processors,
        context_class=dict,
        logger_factory=structlog.stdlib.LoggerFactory(),
        wrapper_class=structlog.stdlib.BoundLogger,
        cache_logger_on_first_use=True,
    )

    # Configure standard logging to route through structlog
    formatter = structlog.stdlib.ProcessorFormatter(
        foreign_pre_chain=shared_processors,
        processors=[
            structlog.stdlib.ProcessorFormatter.remove_processors_meta,
            (
                structlog.processors.JSONRenderer()
                if settings.ENVIRONMENT.lower() == "production"
                else structlog.dev.ConsoleRenderer()
            ),
        ],
    )

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(formatter)

    root_logger = logging.getLogger()
    root_logger.addHandler(handler)
    root_logger.setLevel(log_level)

    # Avoid duplicate uvicorn logs
    for _log in ["uvicorn", "uvicorn.error", "uvicorn.access"]:
        logging.getLogger(_log).handlers.clear()
        logging.getLogger(_log).propagate = True
