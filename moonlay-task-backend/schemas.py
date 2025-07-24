from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from models import TaskStatus

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.todo
    deadline: datetime
    assignee_id: int

class TaskOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: TaskStatus
    deadline: datetime
    assignee_id: int

    class Config:
        orm_mode = True

class UserOut(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    deadline: Optional[datetime] = None
    assignee_id: Optional[int] = None

class TaskStatusUpdate(BaseModel):
    status: TaskStatus
