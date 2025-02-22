import asyncio
from managers.rabbitmq import RabbitMQManager
from managers.database import DatabaseManager
from uuid import uuid4
from threading import Thread

db = DatabaseManager()
worker_doc = db.create('workers', { "status": "active" })
if not worker_doc:
    print("Failed to create worker")
    exit(1)

worker_id = str(worker_doc.inserted_id)
print(f"Worker registered with id: {worker_id}")

worker = RabbitMQManager(worker_id)

print("-----Worker started-----")
asyncio.run(worker.subscribe())

print("-----Worker stopped-----")
