from typing import Generic, TypeVar, List
from pydantic import BaseModel, ConfigDict
import math

T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    model_config = ConfigDict(from_attributes=True)

    items: List[T]
    total: int
    page: int
    size: int

    @property
    def total_pages(self) -> int:
        return max(1, math.ceil(self.total / max(1, self.size)))
