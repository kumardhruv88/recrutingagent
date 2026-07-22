from functools import lru_cache
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application Settings configured via environment variables.
    """

    APP_NAME: str = "HireMind AI Backend"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"

    # API Settings
    API_V1_STR: str = "/api/v1"

    # Database
    DATABASE_URL: str

    # Clerk Auth
    CLERK_SECRET_KEY: str = ""
    CLERK_WEBHOOK_SECRET: str = ""
    CLERK_ISSUER_URL: str = ""
    CLERK_FRONTEND_API: str = ""

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    # Logging
    LOG_LEVEL: str = "INFO"

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )


@lru_cache
def get_settings() -> Settings:
    """
    Returns the cached instance of Settings.
    """
    return Settings()  # type: ignore[call-arg]
