import sys
import os

# Ensure the parent directory (project root) is on sys.path so that
# `backend.*` absolute imports work when running `python main.py` directly.
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from backend.core.config import settings
from backend.db.database import engine
from sqlmodel import SQLModel
from backend.routers import profile, project, skill, social
from fastapi.staticfiles import StaticFiles
import backend.models  # noqa: F401 — registers all SQLModel tables

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create database tables on startup
    SQLModel.metadata.create_all(engine)
    yield
    # No specific shutdown actions needed

app = FastAPI(
    lifespan=lifespan,
    title="Portfolio Website API",
    description="API for the portfolio website",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(CORSMiddleware, allow_origins=settings.ALLOWED_ORIGINS,
                   allow_methods=["*"], allow_headers=["*"],
                   allow_credentials=True)


# Include API routers
app.include_router(profile.router, prefix="/api/profile", tags=["Profile"])
app.include_router(project.router, prefix="/api/projects", tags=["Projects"])
app.include_router(skill.router, prefix="/api/skills", tags=["Skills"])
app.include_router(social.router, prefix="/api/social", tags=["Social Links"])


@app.get("/")
def read_root():
    return {"message": "Welcome to the Portfolio API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
