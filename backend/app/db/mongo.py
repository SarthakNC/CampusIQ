import os
from pathlib import Path

from dotenv import load_dotenv
from pymongo import MongoClient

# Load backend/.env regardless of the terminal's working directory.
ENV_FILE = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(ENV_FILE)

MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DB = os.getenv("MONGODB_DB", "campusiq")


def create_mongo_client() -> MongoClient:
    if not MONGODB_URI:
        raise RuntimeError(
            "MONGODB_URI is missing. Check backend/.env."
        )

    return MongoClient(
        MONGODB_URI,
        serverSelectionTimeoutMS=5000,
    )