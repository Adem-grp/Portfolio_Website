from sqlmodel import SQLModel
from typing import Optional


class SocialRead(SQLModel):
    id: int
    platform_name: str
    platform_url: str
    icon_name: Optional[str] = None
