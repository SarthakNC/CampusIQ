import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pymongo.errors import PyMongoError

from app.api.routes.health import router as health_router
from app.core.config import settings
from app.db.mongo import create_mongo_client


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("campusiq")


@asynccontextmanager
async def lifespan(app: FastAPI):
    client = create_mongo_client()

    try:
        client.admin.command("ping")

        app.state.mongo_client = client
        app.state.db = client[settings.mongodb_db]

        logger.info("CampusIQ connected to MongoDB")

        yield

    finally:
        client.close()
        logger.info("CampusIQ MongoDB connection closed")


app = FastAPI(
    title="CampusIQ API",
    description="Multilingual AI Campus Knowledge Assistant",
    version="0.1.0",
    lifespan=lifespan,
)


origins = [
    origin.strip()
    for origin in settings.cors_origins.split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
):
    return JSONResponse(
        status_code=422,
        content={
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "The request data is invalid.",
            }
        },
    )


@app.exception_handler(PyMongoError)
async def database_exception_handler(
    request: Request,
    exc: PyMongoError,
):
    logger.exception("Database operation failed")

    return JSONResponse(
        status_code=503,
        content={
            "error": {
                "code": "DATABASE_UNAVAILABLE",
                "message": "The database is temporarily unavailable.",
            }
        },
    )


app.include_router(
    health_router,
    prefix="/api",
)