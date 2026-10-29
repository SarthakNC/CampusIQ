from pymongo import MongoClient

from app.core.config import settings


MONGODB_DB = settings.mongodb_db


def create_mongo_client() -> MongoClient:
    return MongoClient(
        settings.mongodb_uri,
        serverSelectionTimeoutMS=5000,
    )