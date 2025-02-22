import aio_pika
import os
from managers.tasks import TaskManager
import asyncio
import json

class RabbitMQManager:
    def __init__(self):
        self.task_manager = TaskManager()
        self.connection = None
        self.channel = None
        self.queue = None
    
    async def init_connection(self):
        try:
            self.connection = await aio_pika.connect_robust(
                host=os.getenv('RABBITMQ_HOST', 'localhost'),
                port=os.getenv('RABBITMQ_PORT', 5672),
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

# # Testing Driver Code

# rm = RabbitMQManager()
# asyncio.run(rm.subscribe())