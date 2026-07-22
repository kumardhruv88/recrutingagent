from typing import Any, Dict, Tuple


class TemplateEngine:
    """
    Renders named notification templates with variable substitution.
    """

    def __init__(self) -> None:
        self._templates: Dict[str, Dict[str, str]] = {
            "interview_invite": {
                "subject": "Interview Invitation: {job_title}",
                "body": "<p>Hello {candidate_name},</p><p>You are invited to an interview for <strong>{job_title}</strong> on {interview_date}.</p>",
            },
            "candidate_application_received": {
                "subject": "Application Received: {job_title}",
                "body": "<p>Dear {candidate_name},</p><p>Thank you for applying to {job_title}. We have received your application.</p>",
            },
            "general_notification": {
                "subject": "{subject}",
                "body": "<p>{message}</p>",
            },
        }

    def register_template(
        self, name: str, subject_template: str, body_template: str
    ) -> None:
        self._templates[name.lower()] = {
            "subject": subject_template,
            "body": body_template,
        }

    def render(self, template_name: str, variables: Dict[str, Any]) -> Tuple[str, str]:
        template_key = template_name.lower()
        if template_key not in self._templates:
            raise ValueError(f"Template '{template_name}' not found")

        tmpl = self._templates[template_key]
        try:
            subject = tmpl["subject"].format(**variables)
            body = tmpl["body"].format(**variables)
            return subject, body
        except KeyError as e:
            raise ValueError(f"Missing required template variable: {e}") from e
