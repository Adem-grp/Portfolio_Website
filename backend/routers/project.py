from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from backend.db.database import get_session
from backend.models.project import Project
from backend.schemas.project import ProjectRead

router = APIRouter(prefix="/api/projects", tags=["projects"])

@router.get("/", response_model=list[ProjectRead])
def read_projects(session: Session = Depends(get_session)):
    projects = session.exec(select(Project)).all()
    return projects

