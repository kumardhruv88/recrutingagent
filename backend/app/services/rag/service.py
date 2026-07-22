import uuid
from typing import List, Optional, Any, Dict, cast
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.models.rag import DocumentChunk
from app.schemas.rag import (
    DocumentIndexRequest,
    SearchRequest,
    SearchResponse,
    SearchResponseChunk,
)
from app.services.ai.orchestrator import AIOrchestratorService
from app.schemas.ai import AITaskType
from app.services.rag.chunking import ChunkingPipeline


class RetrievalService:
    def __init__(
        self, ai_orchestrator: AIOrchestratorService, chunker: ChunkingPipeline
    ) -> None:
        self.ai_orchestrator = ai_orchestrator
        self.chunker = chunker

    async def _get_embedding(self, text: str) -> List[float]:
        response = await self.ai_orchestrator.execute_task(
            AITaskType.EMBEDDING_GENERATION, {"text": text}
        )
        return cast(List[float], response.metadata.get("embedding", []))

    async def index_document(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        request: DocumentIndexRequest,
    ) -> None:
        # First, delete any existing chunks for this document_id
        await self.delete_document(db, organization_id, request.document_id)

        chunks = self.chunker.chunk_text(request.text)

        # Batch insert chunks
        for text_chunk in chunks:
            embedding = await self._get_embedding(text_chunk)

            doc_chunk = DocumentChunk(
                organization_id=organization_id,
                document_id=request.document_id,
                document_type=request.document_type,
                text=text_chunk,
                metadata_=request.metadata_,
                embedding=embedding,
            )
            db.add(doc_chunk)

        await db.commit()

    async def search(
        self, db: AsyncSession, organization_id: uuid.UUID, request: SearchRequest
    ) -> SearchResponse:
        query_embedding = await self._get_embedding(request.query)

        # We use <-> for L2 distance.
        stmt = select(
            DocumentChunk,
            DocumentChunk.embedding.l2_distance(query_embedding).label("distance"),
        ).where(DocumentChunk.organization_id == organization_id)

        if request.document_type:
            stmt = stmt.where(DocumentChunk.document_type == request.document_type)

        stmt = stmt.order_by("distance").limit(request.top_k)

        results = await db.execute(stmt)

        chunks = []
        for chunk, distance in results.all():
            chunks.append(
                SearchResponseChunk(
                    document_id=chunk.document_id,
                    document_type=chunk.document_type,
                    text=chunk.text,
                    metadata=chunk.metadata_,
                    score=float(distance),
                )
            )

        return SearchResponse(results=chunks)

    async def delete_document(
        self, db: AsyncSession, organization_id: uuid.UUID, document_id: uuid.UUID
    ) -> None:
        stmt = delete(DocumentChunk).where(
            DocumentChunk.organization_id == organization_id,
            DocumentChunk.document_id == document_id,
        )
        await db.execute(stmt)
        await db.commit()
