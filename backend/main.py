from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Fake "database"
tasks = []
task_id = 1

class Task(BaseModel):
    title: str
    completed: bool = False

@app.get("/tasks")
def get_tasks():
    return tasks

@app.post("/tasks")
def add_task(task: Task):
    global task_id
    task_dict = {"id": task_id, "title": task.title, "completed": task.completed}
    tasks.append(task_dict)
    task_id += 1
    return task_dict

@app.put("/tasks/{task_id}")
def update_task(task_id: int, updated: Task):
    for task in tasks:
        if task["id"] == task_id:
            task.update(updated.dict())
            return task
    return {"error": "Task not found"}

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    return {"status": "ok"}
