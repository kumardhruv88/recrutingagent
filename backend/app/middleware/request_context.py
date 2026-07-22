import time
import uuid
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import Response
import structlog

from app.core.logging import request_id_ctx_var, correlation_id_ctx_var


class RequestContextMiddleware(BaseHTTPMiddleware):
    """
    Middleware to inject Request ID, Correlation ID, and measure execution time.
    Exposes these via ContextVars to structured logging.
    """

    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        correlation_id = request.headers.get("X-Correlation-ID", request_id)

        # Set ContextVars for logging
        request_id_ctx_var.set(request_id)
        correlation_id_ctx_var.set(correlation_id)

        start_time = time.perf_counter()

        logger = structlog.get_logger()
        logger.info("Request started", method=request.method, path=request.url.path)

        try:
            response = await call_next(request)
        except Exception as e:
            execution_time_ms = (time.perf_counter() - start_time) * 1000
            logger.error(
                "Request failed",
                method=request.method,
                path=request.url.path,
                execution_time_ms=execution_time_ms,
                exc_info=e,
            )
            raise e

        execution_time_ms = (time.perf_counter() - start_time) * 1000
        logger.info(
            "Request completed",
            method=request.method,
            path=request.url.path,
            status_code=response.status_code,
            execution_time_ms=execution_time_ms,
        )

        response.headers["X-Request-ID"] = request_id
        response.headers["X-Correlation-ID"] = correlation_id
        response.headers["X-Process-Time-Ms"] = str(round(execution_time_ms, 2))

        return response
