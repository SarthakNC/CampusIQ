from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.db.mongo import create_mongo_client, MONGODB_DB


@asynccontextmanager
async def lifespan(app: FastAPI):
    client = create_mongo_client()

    try:
        # Verify the connection at application startup.
        client.admin.command("ping")

        app.state.mongo_client = client
        app.state.db = client[MONGODB_DB]

        print("MongoDB connected successfully.")

        yield

    finally:
        client.close()
        print("MongoDB connection closed.")


app = FastAPI(
    title="CampusIQ API",
    description="Backend for the CampusIQ knowledge assistant",
    version="0.1.0",
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "project": "CampusIQ",
    }


@app.get("/api/health/db")
def database_health_check(request: Request):
    request.app.state.db.command("ping")

    return {
        "status": "ok",
        "database": MONGODB_DB,
        "message": "MongoDB connection successful",
    }