from markdown_it.rules_inline import link_pairs
from sqlmodel import SQLModel, Relationship
from typing import Optional, List


class SkillRead(SQLModel):
    id: int
    name: str
    category: str
    proficiency: Optional[str] = None


class SkillCreate(SQLModel):
    id: int
    name: Optional[str] = None
    category: Optional[str] = None
    proficiency: Optional[str] = None
