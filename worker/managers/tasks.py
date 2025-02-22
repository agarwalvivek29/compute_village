import json
import docker
import asyncio
import os

class TaskManager:
    def __init__(self):
        self.docker_client = docker.from_env()

    def run_docker_container(self, task):
        try:
            print("\n\n-----Docker Container Running-----")
            print(f"Task: {task}")
            container = self.docker_client.containers.run(
                image=task['image'],
                environment=task['environment'],
                volumes={
                    f"{os.getcwd()}/outputs/{task['id']}": {
                        "bind": "/app",
                        "mode": "rw"
                    }
                },
                detach=True,
                stdout=True,
                stderr=True
            )
            container.wait()
            logs = container.logs().decode('utf-8')
            print(f"\n\n-----Docker Container Logs-----")
            print(logs)
            container.remove()
            print("\n\n-----Docker Container Removed-----\n\n")

            return logs

        except Exception as e:
            print(e)
            return None
        
    def run(self, task):
        output = self.run_docker_container(task)
        return output
    
## Testing Driver Code

# from uuid import uuid4
# tm = TaskManager()
# op = tm.run({"image": "basepy_test", "environment": {"VAR": "value"}, "id": str(uuid4())})
# print(op)