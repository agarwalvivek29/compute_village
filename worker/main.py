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

subscriber = Thread(target=asyncio.run, args=(worker.subscribe(),))
heartbeat = Thread(target=asyncio.run, args=(worker.heartbeat(),))

subscriber.start()
print("-----Subscriber started-----")

heartbeat.start()
print("-----Heartbeat started-----")

subscriber.join()
heartbeat.join()

print("-----Worker stopped-----")