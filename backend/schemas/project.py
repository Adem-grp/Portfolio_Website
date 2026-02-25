from sqlmodel import SQLModel
from typing import Optional, List
from .skill import SkillRead

class ProjectBase(SQLModel):
    title: str
    description: str
    short_summary: str
    technologies: str
    github_link: Optional[str] = None
    image_path: Optional[str] = None

class ProjectRead(ProjectBase):
    id: int
    skills: List[SkillRead] = []

