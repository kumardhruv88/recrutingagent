from typing import Any, Dict, Generic, List, Optional, Type, TypeVar
from sqlalchemy import select, update, delete, exists, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.base import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    """
    Base generic repository for CRUD operations over async SQLAlchemy.
    """

    def __init__(self, model: Type[ModelType]):
        self.model = model

    async def get(self, db: AsyncSession, **kwargs: Any) -> Optional[ModelType]:
        stmt = select(self.model).filter_by(**kwargs)
        result = await db.execute(stmt)
        return result.scalars().first()

    async def get_by_id(self, db: AsyncSession, id: Any) -> Optional[ModelType]:
        return await db.get(self.model, id)

    async def create(self, db: AsyncSession, obj_in: Dict[str, Any]) -> ModelType:
        db_obj = self.model(**obj_in)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def update(
        self, db: AsyncSession, db_obj: ModelType, obj_in: Dict[str, Any]
    ) -> ModelType:
        for field, value in obj_in.items():
            setattr(db_obj, field, value)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def delete(self, db: AsyncSession, id: Any) -> bool:
        stmt = delete(self.model).where(getattr(self.model, "id") == id)
        result = await db.execute(stmt)
        await db.commit()
        return result.rowcount > 0

    async def exists(self, db: AsyncSession, **kwargs: Any) -> bool:
        stmt = select(
            exists().where(*[getattr(self.model, k) == v for k, v in kwargs.items()])
        )
        result = await db.execute(stmt)
        return result.scalar() or False

    async def paginate(
        self, db: AsyncSession, skip: int = 0, limit: int = 100, **kwargs: Any
    ) -> tuple[List[ModelType], int]:
        """Returns paginated results and the total count."""
        base_stmt = select(self.model).filter_by(**kwargs)

        # Get count
        count_stmt = select(func.count()).select_from(base_stmt.subquery())
        count_result = await db.execute(count_stmt)
        total = count_result.scalar_one()

        # Get items
        items_stmt = base_stmt.offset(skip).limit(limit)
        items_result = await db.execute(items_stmt)
        items = list(items_result.scalars().all())

        return items, total
