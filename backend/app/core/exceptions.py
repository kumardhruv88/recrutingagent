from typing import Any, Dict, Optional


class BaseAppException(Exception):
    """
    Base exception for all application-level exceptions.
    """

    def __init__(
        self,
        message: str,
        status_code: int = 500,
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.details = details or {}


class ValidationException(BaseAppException):
    def __init__(
        self,
        message: str = "Validation failed",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message=message, status_code=422, details=details)


class NotFoundException(BaseAppException):
    def __init__(
        self,
        message: str = "Resource not found",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message=message, status_code=404, details=details)


class ConflictException(BaseAppException):
    def __init__(
        self,
        message: str = "Resource conflict",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message=message, status_code=409, details=details)


class UnauthorizedException(BaseAppException):
    def __init__(
        self,
        message: str = "Unauthorized access",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message=message, status_code=401, details=details)


class ForbiddenException(BaseAppException):
    def __init__(
        self,
        message: str = "Access forbidden",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message=message, status_code=403, details=details)


class DatabaseException(BaseAppException):
    def __init__(
        self,
        message: str = "Database error occurred",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message=message, status_code=500, details=details)


class InternalServerException(BaseAppException):
    def __init__(
        self,
        message: str = "Internal server error",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message=message, status_code=500, details=details)
