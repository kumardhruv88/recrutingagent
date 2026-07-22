from typing import Dict, Optional, Any

from app.services.email.providers.base import EmailProviderProtocol


class ProviderNotFoundError(Exception):
    pass


class TemplateNotFoundError(Exception):
    pass


class EmailProviderRegistry:
    """Registry to manage and resolve Email providers dynamically."""

    def __init__(self) -> None:
        self._providers: Dict[str, EmailProviderProtocol] = {}
        self._default_provider: Optional[str] = None

    def register(
        self, provider: EmailProviderProtocol, is_default: bool = False
    ) -> None:
        self._providers[provider.name] = provider
        if is_default or not self._default_provider:
            self._default_provider = provider.name

    def resolve(self, name: Optional[str] = None) -> EmailProviderProtocol:
        target = name or self._default_provider
        if not target or target not in self._providers:
            raise ProviderNotFoundError(f"Provider '{target}' is not registered.")
        return self._providers[target]


class TemplateRegistry:
    """Registry to manage HTML email templates."""

    def __init__(self) -> None:
        self._templates: Dict[str, str] = {}
        # Pre-seed some default HTML templates for core business workflows
        self._templates["welcome"] = (
            "<h1>Welcome to HireMind AI, {name}!</h1>"
            "<p>We're excited to have you on board.</p>"
        )
        self._templates["interview_invitation"] = (
            "<h1>Interview Invitation</h1>"
            "<p>Hi {candidate_name}, you have been invited to an interview for the {job_title} role.</p>"
        )

    def register(self, template_name: str, template_html: str) -> None:
        self._templates[template_name] = template_html

    def render(self, template_name: str, variables: Dict[str, Any]) -> str:
        if template_name not in self._templates:
            raise TemplateNotFoundError(f"No template registered for: {template_name}")

        template = self._templates[template_name]
        try:
            return template.format(**variables)
        except KeyError as e:
            raise ValueError(f"Missing variable for template formatting: {e}")
