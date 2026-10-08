import os
from typing import List, Union
from pydantic_settings import BaseSettings
from pydantic import field_validator


class Settings(BaseSettings):
    API_PREFIX: str = "/api"
    DEBUG: bool = False
    DATABASE_URL: str
    ALLOWED_ORIGINS: Union[List[str], str] = ""

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def parse_allowed_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v

    model_config = {
        "env_file": (
            os.path.join(os.path.dirname(__file__), "..", ".env")  # always resolves to backend/.env
        ),
        "env_file_encoding": "utf-8",
        "case_sensitive": True,
    }

settings = Settings()


