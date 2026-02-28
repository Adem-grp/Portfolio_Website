from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from backend.db.database import get_session
from backend.models.skill import Skill
from backend.schemas.skill import SkillRead

router = APIRouter()

@router.get("/", response_model=list[SkillRead])
def read_skills(session: Session = Depends(get_session)):
    skills = session.exec(select(Skill)).all()
    return skills
@router.post("/", response_model=SkillRead)
def create_skill(skill: SkillRead, session: Session = Depends(get_session)):
    db_skill = Skill.model_validate(skill)
    session.add(db_skill)
    session.commit()
    session.refresh(db_skill)
    return db_skill
