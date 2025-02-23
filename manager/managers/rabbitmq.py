import aio_pika
import os
from managers.tasks import TaskManager
from managers.database import DatabaseManager
import asyncio
import json
import time
from threading import Thread
from uuid import uuid4
from dotenv import load_dotenv

load_dotenv()

class RabbitMQManager:
    _workers = {}

    def __init__(self):
        self.task_manager = TaskManager()
        self.connection = None
        self.channel = None
        self.queue = None
        RabbitMQManager._workers = {}
        self.database_manager = DatabaseManager()
    
    @classmethod
    def get_workers(cls):
        return cls._workers

    @classmethod
    def set_workers(cls, workers):
        cls._workers = workers

    async def init_connection(self):
        try:
            self.connection = await aio_pika.connect_robust(
                host=os.getenv('RABBITMQ_HOST', 'localhost'),
                port=int(os.getenv('RABBITMQ_PORT', 5672)),
                login=os.getenv('RABBITMQ_USER', 'guest'),
                password=os.getenv('RABBITMQ_PASSWORD', 'guest')
            )
            self.queue = os.getenv('RABBITMQ_QUEUE', 'default')
            self.channel = await self.connection.channel()
        except Exception as e:
            print(e)
            raise e
        
    async def publish(self, message):
        if not self.connection:
            await self.init_connection()
        await self.channel.default_exchange.publish(
            aio_pika.Message(body=json.dumps(message).encode()),
            routing_key=self.queue
        )
        print(f"Published message to {self.queue} queue")

    async def subscribe(self, queue_name, callback):
        if not self.connection:
            await self.init_connection()

        heartbeat_task = asyncio.create_task(self.monitor_heartbeats())
        queue = await self.channel.declare_queue(
            queue_name,
            durable=False
        )
        await queue.consume(callback=callback)

        print(f"Listening for messages on {queue_name} queue")
        await asyncio.gather(heartbeat_task, asyncio.Event().wait())

    async def monitor_heartbeats(self):
        while True:
            await asyncio.sleep(10)
            workers = RabbitMQManager._workers.copy()
            print(f"Monitoring {len(workers.keys())} workers")
            for worker_id, last_heartbeat in RabbitMQManager._workers.items():
                current_time = time.time()
                if current_time - last_heartbeat > 30:
                    workers.pop(worker_id)
                    self.database_manager.update_worker_status(worker_id, "inactive")
                    print(f"Worker {worker_id} marked as inactive")
            self.set_workers(workers)

    def process_heartbeat(self, message):
        data = json.loads(message.body)
        worker_id = data['worker_id']
        if worker_id not in RabbitMQManager._workers:
            self.database_manager.update_worker_status(worker_id, "active")
            print(f"Worker {worker_id} marked as active")

        workers = RabbitMQManager._workers
        workers[worker_id] = data['timestamp']
        self.set_workers(workers)

# # Testing Driver Code
# async def main():
#     rm = RabbitMQManager(str(uuid4()))
#     await rm.publish({"image": "basepy_test", "environment": {"VAR": "value"}, "id": str(uuid4())})
#     await rm.subscribe("heartbeat", rm.process_heartbeat)

# if __name__ == "__main__":
#     asyncio.run(main())
