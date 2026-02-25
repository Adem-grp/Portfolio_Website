from sqlmodel import SQLModel, Field, Relationship
from typing import Optional,List, TYPE_CHECKING


if TYPE_CHECKING:
    from social import Social

class Profile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str
    title: str
    Linkedin_url: str
    bio: Optional[str] = None
    # finds all social links that have the id of the profile
    socials: List["Social"] = Relationship(back_populates="profile")

# maybe make an admin panel and add stuff there or fetch from somewhere
# so learn how to arrange schemas routers and models and core logic