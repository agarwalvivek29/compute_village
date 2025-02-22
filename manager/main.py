from fastapi import FastAPI, Depends, HTTPException
from uuid import uuid4
from typing import Dict, List

app = FastAPI(title="Decentralized Compute Manager")

@app.post("/register")
async def register_user() -> Dict[str, str]:
    user_id = str(uuid4())
    # TODO: Store user in database
    return {"user_id": user_id}

@app.post("/submit_task")
async def submit_task(task: Dict[str, any], userId: str) -> Dict[str, str]:
    

@app.get("/tasks/{task_id}")
async def get_task_status(task_id: str, user: User = Depends(get_current_user)) -> TaskStatus:
    # TODO: Get task status from database
    pass

if __name__ == "__main__":
    app.run()