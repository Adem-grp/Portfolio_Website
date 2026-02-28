from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from backend.models.profile import Profile

class Social(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    platform_name: str
    platform_url: str
    icon_name: str
    # link to profile
    profile_id: Optional[int] = Field(default=None, foreign_key="profile.id")
    profile: Optional["Profile"] = Relationship(back_populates="socials")
