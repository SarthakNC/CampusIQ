from app.db.mongo import create_mongo_client, MONGODB_DB


COLLECTIONS = [
    "users",
    "documents",
    "document_chunks",
    "conversations",
    "messages",
    "ingestion_jobs",
]


def initialize_database():
    client = create_mongo_client()

    try:
        # Verify that MongoDB is reachable.
        client.admin.command("ping")

        db = client[MONGODB_DB]
        existing = set(db.list_collection_names())

        # Create the initial collections.
        for name in COLLECTIONS:
            if name not in existing:
                db.create_collection(name)
                print(f"Created collection: {name}")
            else:
                print(f"Collection already exists: {name}")

        # Create indexes for common lookups.
        db.users.create_index("email", unique=True)

        db.documents.create_index("status")
        db.documents.create_index("created_at")

        db.document_chunks.create_index("document_id")

        db.conversations.create_index(
            [("user_id", 1), ("updated_at", -1)]
        )

        db.messages.create_index(
            [("conversation_id", 1), ("created_at", 1)]
        )

        db.ingestion_jobs.create_index(
            [("status", 1), ("created_at", 1)]
        )

        print(f"\nDatabase '{MONGODB_DB}' initialized successfully.")

    finally:
        client.close()


if __name__ == "__main__":
    initialize_database()