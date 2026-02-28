from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List, TYPE_CHECKING
from .links import ProjectSkillLink

if TYPE_CHECKING:
    from .project import Project

class Skill(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    category: str
    proficiency: Optional[str] = None

    projects: List["Project"] = Relationship(back_populates="skills", link_model=ProjectSkillLink)
