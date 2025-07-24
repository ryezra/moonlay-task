from sqlalchemy.orm import Session
import models, schemas

def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(
        title=task.title,
        description=task.description,
        status=task.status,
        deadline=task.deadline,
        assignee_id=task.assignee_id
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_all_tasks(db: Session):
    return db.query(models.Task).all()

def get_users(db: Session):
    return db.query(models.User).all()

def update_task(db: Session, task_id: int, updated_task: schemas.TaskUpdate):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        return None

    for field, value in updated_task.dict(exclude_unset=True).items():
        setattr(task, field, value)

    db.commit()
    db.refresh(task)
    return task

def delete_task(db: Session, task_id: int):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        return None
    db.delete(task)
    db.commit()
    return task

def update_task_status(db: Session, task_id: int, status: schemas.TaskStatusUpdate):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        return None
    task.status = status.status
    db.commit()
    db.refresh(task)
    return task

def create_user(db: Session, name: str):
    user = models.User(name=name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user