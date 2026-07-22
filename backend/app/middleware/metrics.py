import time
from typing import Any, Dict
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import Response


class MetricsTracker:
    """
    In-memory metrics tracker for lightweight request monitoring.
    """

    def __init__(self) -> None:
        self.total_requests: int = 0
        self.total_errors: int = 0
        self.total_response_time_ms: float = 0.0
        self.endpoints: Dict[str, Dict[str, Any]] = {}

    def record_request(
        self, method: str, path: str, status_code: int, response_time_ms: float
    ) -> None:
        self.total_requests += 1
        self.total_response_time_ms += response_time_ms

        if status_code >= 400:
            self.total_errors += 1

        endpoint_key = f"{method} {path}"
        if endpoint_key not in self.endpoints:
            self.endpoints[endpoint_key] = {
                "count": 0,
                "error_count": 0,
                "total_time_ms": 0.0,
                "avg_time_ms": 0.0,
            }

        ep = self.endpoints[endpoint_key]
        ep["count"] += 1
        if status_code >= 400:
            ep["error_count"] += 1
        ep["total_time_ms"] += response_time_ms
        ep["avg_time_ms"] = round(ep["total_time_ms"] / ep["count"], 2)

    def get_summary(self) -> Dict[str, Any]:
        avg_time = (
            round(self.total_response_time_ms / self.total_requests, 2)
            if self.total_requests > 0
            else 0.0
        )
        return {
            "total_requests": self.total_requests,
            "total_errors": self.total_errors,
            "average_response_time_ms": avg_time,
            "endpoints": self.endpoints,
        }


metrics_tracker = MetricsTracker()


class MetricsMiddleware(BaseHTTPMiddleware):
    """
    Middleware that records HTTP request counts, response times, and status code metrics.
    """

    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        start_time = time.perf_counter()
        response = await call_next(request)
        execution_time_ms = (time.perf_counter() - start_time) * 1000.0

        metrics_tracker.record_request(
            method=request.method,
            path=request.url.path,
            status_code=response.status_code,
            response_time_ms=execution_time_ms,
        )

        return response
