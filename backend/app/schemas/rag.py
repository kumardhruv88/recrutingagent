import uuid
from typing import Optional, Dict, Any, List
from pydantic import BaseModel, Field, ConfigDict


class DocumentIndexRequest(BaseModel):
    document_id: uuid.UUID = Field(..., description="The ID of the document to index.")
    document_type: str = Field(
        ..., description="Type of document (e.g., RESUME, JOB, GITHUB)."
    )
    text: str = Field(
        ..., description="The full raw text of the document to be chunked and indexed."
    )
    metadata_: Optional[Dict[str, Any]] = Field(
        None,
        alias="metadata",
        description="Any source metadata like file name or links.",
    )

    class Config:
        populate_by_name = True


class SearchRequest(BaseModel):
    query: str = Field(..., description="Natural language search query.")
    document_type: Optional[str] = Field(
        None, description="Optional document type to filter by."
    )
    top_k: int = Field(5, ge=1, le=20, description="Number of top chunks to return.")


class ContextBuilderRequest(BaseModel):
    query: str = Field(..., description="The context request query.")
    document_types: Optional[List[str]] = Field(
        None, description="Filter for document types."
    )
    max_tokens: int = Field(
        3000,
        ge=100,
        le=8000,
        description="Estimated maximum token capacity for the context.",
    )


class SearchResponseChunk(BaseModel):
    document_id: uuid.UUID
    document_type: str
    text: str
    metadata_: Optional[Dict[str, Any]] = Field(None, alias="metadata")
    score: float = Field(..., description="Distance score.")

    class Config:
        populate_by_name = True


class SearchResponse(BaseModel):
    results: List[SearchResponseChunk]


class ContextResponse(BaseModel):
    context: str = Field(..., description="The assembled markdown context string.")
    token_estimate: int = Field(
        ..., description="An approximate token count for the assembled context."
    )
