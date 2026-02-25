from typing import List, Optional
from sqlmodel import SQLModel
from .social import SocialRead

class ProfileBase(SQLModel):
    full_name: str
    title: str
    Linkedin_url: str
    bio: Optional[str] = None


class ProfileRead(ProfileBase):
    id: int
    socials: List[SocialRead] = []
