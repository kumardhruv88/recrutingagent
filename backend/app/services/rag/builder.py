import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Any

from app.schemas.rag import ContextBuilderRequest, ContextResponse, SearchRequest
from app.services.rag.service import RetrievalService


class ContextBuilder:
    def __init__(self, retrieval_service: RetrievalService) -> None:
        self.retrieval_service = retrieval_service

    async def build_context(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        request: ContextBuilderRequest,
    ) -> ContextResponse:
        # We can dynamically adjust top_k based on max_tokens.
        # For simplicity, assuming ~4 chars per token, chunk size is 1000 chars (~250 tokens).
        # top_k = max_tokens // 250
        top_k = max(1, request.max_tokens // 250)

        search_req = SearchRequest(
            query=request.query,
            document_type=(
                request.document_types[0]
                if request.document_types and len(request.document_types) == 1
                else None
            ),  # if multiple, we might need multiple searches or alter SearchRequest, but for now take first or None
            top_k=top_k,
        )

        search_res = await self.retrieval_service.search(
            db, organization_id, search_req
        )

        if not search_res.results:
            return ContextResponse(
                context="No relevant context found.", token_estimate=0
            )

        context_parts = []
        token_estimate = 0

        for idx, chunk in enumerate(search_res.results):
            # approximate token count
            tokens = len(chunk.text) // 4
            if token_estimate + tokens > request.max_tokens:
                break

            source_info = f"Document Type: {chunk.document_type}"
            if chunk.metadata_:
                source_info += f" | Metadata: {chunk.metadata_}"

            context_parts.append(
                f"--- Source {idx+1} ({source_info}) ---\n{chunk.text}\n"
            )
            token_estimate += tokens

        final_context = "\n".join(context_parts)
        return ContextResponse(context=final_context, token_estimate=token_estimate)
