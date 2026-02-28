from fastapi import APIRouter, Depends
from sqlalchemy.orm import selectinload
from sqlmodel import Session, select
from backend.db.database import get_session
from backend.models.project import Project
from backend.schemas.project import ProjectRead, ProjectCreate
from backend.models.links import ProjectSkillLink
from backend.models.skill import Skill
router = APIRouter()

@router.get("/", response_model=list[ProjectRead])
def read_projects(session: Session = Depends(get_session)):
    projects = session.exec(select(Project).options(selectinload(Project.skills))).all()
    return projects

# for now these types of additions meaning put all to array send it here I suppose
@router.post("/", response_model=ProjectRead)
def create_project(project: ProjectCreate, session: Session = Depends(get_session)):
    skills_to_add = project.skills
    db_project = Project.model_validate(project,update={"skills": []})
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    for skill in skills_to_add:
        statement = select(Skill).where(Skill.id == skill.id)
        existing_skill = session.exec(statement).first()
        if existing_skill:
            db_project.skills.append(existing_skill)
    session.commit()
    session.refresh(db_project)
    return db_project
@router.post("/{project_id}/skills/{skill_id}")
def add_skill_to_project(project_id: int, skill_id: int, session: Session = Depends(get_session)):
    link = ProjectSkillLink(project_id=project_id, skill_id=skill_id)
    session.add(link)
    session.commit()
    return {"message": "Skill added to project successfully"}

