import aio_pika
import os
from managers.tasks import TaskManager
import asyncio
import json
import time
from threading import Thread
from uuid import uuid4

class RabbitMQManager:
    def __init__(self, _id):
        self._id = _id
        self.task_manager = TaskManager()
        self.connection = None
        self.channel = None
        self.queue = None
    
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

    async def subscribe(self):
        if not self.connection:
            await self.init_connection()
        queue = await self.channel.declare_queue(
            self.queue,
            durable=True,
        )
        await queue.consume(self.callback)
        print(f"Listening for messages on {self.queue} queue")
        await asyncio.Event().wait()
    
    async def callback(self, message: aio_pika.IncomingMessage):
        task = json.loads(message.body.decode("utf-8"))
        print(f"\n\n-----Task Started-----")
        output = self.task_manager.run(task)
        print(f"\n\n-----Task Finished-----")
        await message.ack()

    async def heartbeat(self):
        while True:
            if not self.connection:
                await self.init_connection()
            message = json.dumps({"worker_id": self._id, "timestamp": time.time()})
            await self.channel.default_exchange.publish(
                aio_pika.Message(body=message.encode()),
                routing_key='heartbeat',
            )
            print(f"Worker {self._id} sent heartbeat")
            await asyncio.sleep(30)

# # Testing Driver Code

# rm = RabbitMQManager(str(uuid4()))
# thread = Thread(target=asyncio.run, args=(rm.heartbeat(),))
# thread.start()
# asyncio.run(rm.subscribe())
# thread.join()