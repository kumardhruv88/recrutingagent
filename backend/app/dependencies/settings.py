from app.core.config import get_settings, Settings


def get_app_settings() -> Settings:
    """
    Dependency that provides application settings.
    """
    return get_settings()
