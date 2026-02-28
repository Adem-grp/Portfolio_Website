from sqlmodel import create_engine, SQLModel, Session
from backend.core.config import settings

# Use DATABASE_URL from the Settings instance (core.config.Settings)
# settings already loads the .env file via pydantic's BaseSettings config
DATABASE_URL = settings.DATABASE_URL

# create the SQL engine
engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
