from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from backend.db.database import get_session
from backend.models.profile import Profile
from backend.schemas.profile import ProfileRead

router = APIRouter(prefix="/api/profile", tags=["profile"])

@router.get("/", response_model=ProfileRead)
def read_profile(session: Session = Depends(get_session)):
    profile = session.exec(select(Profile)).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile
