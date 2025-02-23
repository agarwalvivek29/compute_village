from fastapi import FastAPI, Depends, HTTPException
from uuid import uuid4
from typing import Dict, List
from managers.rabbitmq import RabbitMQManager
from managers.database import DatabaseManager
from pydantic import BaseModel, Field
import asyncio
import threading

app = FastAPI(title="Decentralized Compute Manager")
task_manager = RabbitMQManager()
heartbeat_task_manager = RabbitMQManager()
database_manager = DatabaseManager()

class UserReqModel(BaseModel):
    user_id: str = Field(..., example="user123")

class TaskReqModel(BaseModel):
    image: str = Field(..., example="python:3.8-slim")
    environment: Dict[str, str] = Field(..., example={"VAR1": "value1", "VAR2": "value2"})
    args: Dict[str, str] = Field(..., example={"arg1": "value1", "arg2": "value2"})
    user_id: str = Field(..., example="user123")

class RegisterUserResponseModel(BaseModel):
    success: bool
    user_id: str = Field(None, example="user123")
    message: str = Field(None, example="Failed to register user")

class SubmitTaskResponseModel(BaseModel):
    success: bool
    task_id: str = Field(None, example="task123")
    message: str = Field(None, example="Failed to submit task")

def run_in_new_loop(coro):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(coro)
    loop.close()

@app.on_event("startup")
async def startup():
    thread = threading.Thread(target=run_in_new_loop, args=(heartbeat_task_manager.subscribe("heartbeat", task_manager.process_heartbeat),))
    thread.start()

@app.post("/register", response_model=RegisterUserResponseModel, summary="Register a new user", description="Registers a new user in the system.")
async def register_user(user: UserReqModel) -> Dict[str, str]:
    userId = user.user_id
    user_doc = database_manager.create(collection="users", data={"user_id": userId})
    if not user_doc:
        return { "success": False, "message": "Failed to register user" }
    return { "success": True, "user_id": str(user_doc.inserted_id) }

@app.post("/submit_task", response_model=SubmitTaskResponseModel, summary="Submit a new task", description="Submits a new task to the system.")
async def submit_task(task: TaskReqModel):
    task_doc = {
        "image": task.image,
        "environment": task.environment,
        "args": task.args,
        "user_id": task.user_id,
        "status": "PENDING"
    }

    task_1 = database_manager.create(collection="tasks", data=task_doc)
    if not task_1:
        return { "success": False, "message": "Failed to submit task" }
    task_id = str(task_1.inserted_id)
    task_doc["id"] = str(task_id)
    try:
        del task_doc["_id"]
    except KeyError:
        pass

    for k, v in task_doc.items():
        print(f"{k}: {v}")
        print(type(v))

    await task_manager.publish(task_doc)
    return { "success": True, "task_id": str(task_id) }

@app.get("/", summary="Hello World", description="Returns a simple greeting message.")
async def hello():
    return { "message": "Hello World" }
