import structlog
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from sqlalchemy.exc import SQLAlchemyError

from app.core.exceptions import BaseAppException
from app.utils.responses import error_response

logger = structlog.get_logger()


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(BaseAppException)
    async def app_exception_handler(
        request: Request, exc: BaseAppException
    ) -> JSONResponse:
        logger.warning(
            f"Application error: {exc.message}",
            status_code=exc.status_code,
            details=exc.details,
        )
        response_model = error_response(message=exc.message, details=exc.details)
        return JSONResponse(
            status_code=exc.status_code, content=response_model.model_dump()
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request, exc: RequestValidationError
    ) -> JSONResponse:
        logger.warning("Validation error", errors=exc.errors())
        details = {"errors": exc.errors()}
        response_model = error_response(message="Validation failed", details=details)
        return JSONResponse(status_code=422, content=response_model.model_dump())

    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(
        request: Request, exc: StarletteHTTPException
    ) -> JSONResponse:
        logger.warning(f"HTTP error: {exc.detail}", status_code=exc.status_code)
        response_model = error_response(message=str(exc.detail))
        return JSONResponse(
            status_code=exc.status_code, content=response_model.model_dump()
        )

    @app.exception_handler(SQLAlchemyError)
    async def sqlalchemy_exception_handler(
        request: Request, exc: SQLAlchemyError
    ) -> JSONResponse:
        logger.error("Database error", exc_info=exc)
        response_model = error_response(message="Database error occurred")
        return JSONResponse(status_code=500, content=response_model.model_dump())

    @app.exception_handler(Exception)
    async def global_exception_handler(
        request: Request, exc: Exception
    ) -> JSONResponse:
        logger.error("Unhandled exception", exc_info=exc)
        response_model = error_response(message="Internal server error")
        return JSONResponse(status_code=500, content=response_model.model_dump())
