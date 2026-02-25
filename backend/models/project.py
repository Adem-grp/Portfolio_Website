from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List, TYPE_CHECKING
from .links import ProjectSkillLink

if TYPE_CHECKING:
    from .skill import Skill

class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    description: str
    short_summary: str
    technologies: str
    github_link: Optional[str] = None
    image_path: Optional[str] = None

    skills: List["Skill"] = Relationship(back_populates="projects", link_model=ProjectSkillLink)
