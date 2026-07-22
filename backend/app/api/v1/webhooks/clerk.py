import structlog
from fastapi import APIRouter, Request, Depends, HTTPException
from svix.webhooks import Webhook, WebhookVerificationError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.dependencies.database import get_db_session
from app.services.webhooks import ClerkWebhookService
from app.utils.responses import APIResponse, success_response

logger = structlog.get_logger()
router = APIRouter()


@router.post("/clerk", response_model=APIResponse)
async def clerk_webhook(
    request: Request, db: AsyncSession = Depends(get_db_session)
) -> APIResponse:
    settings = get_settings()
    if not settings.CLERK_WEBHOOK_SECRET:
        raise HTTPException(
            status_code=500, detail="Clerk webhook secret not configured"
        )

    payload = await request.body()
    headers = request.headers

    svix_id = headers.get("svix-id")
    svix_timestamp = headers.get("svix-timestamp")
    svix_signature = headers.get("svix-signature")

    if not svix_id or not svix_timestamp or not svix_signature:
        raise HTTPException(status_code=400, detail="Missing svix headers")

    wh = Webhook(settings.CLERK_WEBHOOK_SECRET)
    try:
        evt = wh.verify(payload, dict(headers))
    except WebhookVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    event_type = evt.get("type", "")
    data = evt.get("data", {})

    service = ClerkWebhookService()

    try:
        if event_type.startswith("user."):
            await service.run_in_transaction(
                db, service.handle_user_event, event_type, data
            )
        elif event_type.startswith("organization."):
            await service.run_in_transaction(
                db, service.handle_organization_event, event_type, data
            )
        elif event_type.startswith("organizationMembership."):
            await service.run_in_transaction(
                db, service.handle_membership_event, event_type, data
            )
        else:
            logger.info("Ignored unhandled Clerk webhook event", event_type=event_type)
    except Exception as e:
        logger.error(
            "Error processing Clerk webhook", event_type=event_type, exc_info=e
        )
        raise HTTPException(status_code=500, detail="Internal processing error")

    return success_response(message="Webhook processed successfully")
