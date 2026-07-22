import uuid
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies.database import get_db_session
from app.dependencies.auth import get_current_organization, require_permission
from app.models.auth import Organization
from app.models.enums import Permission

from app.schemas.rag import (
    DocumentIndexRequest,
    SearchRequest,
    SearchResponse,
    ContextBuilderRequest,
    ContextResponse,
)
from app.services.rag.chunking import ChunkingPipeline
from app.services.rag.service import RetrievalService
from app.services.rag.builder import ContextBuilder
from app.services.ai.orchestrator import AIOrchestratorService
from app.services.ai.registry import ProviderRegistry, PromptRegistry
from app.services.ai.router import AITaskRouter

router = APIRouter()


# Dependency injection for services
def get_rag_services() -> tuple[RetrievalService, ContextBuilder]:
    # In production, these should be managed by a DI container
    provider_registry = ProviderRegistry()
    prompt_registry = PromptRegistry()
    ai_router = AITaskRouter()
    ai_orchestrator = AIOrchestratorService(
        provider_registry, prompt_registry, ai_router
    )

    chunker = ChunkingPipeline()
    retrieval_service = RetrievalService(ai_orchestrator, chunker)
    context_builder = ContextBuilder(retrieval_service)

    return retrieval_service, context_builder


@router.post("/index", status_code=status.HTTP_201_CREATED)
async def index_document(
    request: DocumentIndexRequest,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    services: tuple[RetrievalService, ContextBuilder] = Depends(get_rag_services),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),
) -> dict[str, str]:
    """Index a document for semantic search."""
    retrieval_service, _ = services
    await retrieval_service.index_document(db, organization.id, request)
    return {"status": "success", "message": "Document indexed successfully."}


@router.post("/search", response_model=SearchResponse)
async def search_documents(
    request: SearchRequest,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    services: tuple[RetrievalService, ContextBuilder] = Depends(get_rag_services),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Semantic search over indexed documents."""
    retrieval_service, _ = services
    return await retrieval_service.search(db, organization.id, request)


@router.post("/context", response_model=ContextResponse)
async def build_context(
    request: ContextBuilderRequest,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    services: tuple[RetrievalService, ContextBuilder] = Depends(get_rag_services),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Build a context string from retrieved documents for AI prompting."""
    _, context_builder = services
    return await context_builder.build_context(db, organization.id, request)


@router.delete("/index/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_document(
    document_id: uuid.UUID,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    services: tuple[RetrievalService, ContextBuilder] = Depends(get_rag_services),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),
) -> None:
    """Delete all chunks for a given document."""
    retrieval_service, _ = services
    await retrieval_service.delete_document(db, organization.id, document_id)
