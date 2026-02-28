from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from backend.db.database import get_session
from backend.models.social import Social
from backend.schemas.social import SocialRead

router = APIRouter()
@router.get("/", response_model=list[SocialRead])
def read_socials(session: Session = Depends(get_session)):
    socials = session.exec(select(Social)).all()
    return socials

@router.post("/", response_model=SocialRead)
def create_social(social: SocialRead, session: Session = Depends(get_session)):
    session.add(social)
    session.commit()
    session.refresh(social)
    return social