from fastapi import APIRouter, Depends, HTTPException
from pymongo.database import Database
from pymongo.errors import PyMongoError

from app.core.config import settings
from app.db.dependencies import get_database


router = APIRouter(tags=["Health"])


@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "project": "CampusIQ",
    }


@router.get("/health/db")
def database_health_check(
    db: Database = Depends(get_database),
):
    try:
        db.command("ping")

        return {
            "status": "ok",
            "database": settings.mongodb_db,
            "message": "MongoDB connection successful",
        }

    except PyMongoError:
        raise HTTPException(
            status_code=503,
            detail="Database temporarily unavailable",
        )