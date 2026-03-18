from sqlalchemy import Column, Integer, String, DateTime, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./shakeback.db")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String, index=True)
    role = Column(String, index=True)
    status = Column(String, default="applied")  # applied, interview, rejected, offer
    notes = Column(Text, nullable=True)
    applied_date = Column(DateTime, nullable=True)
    interview_date = Column(DateTime, nullable=True)
    job_description = Column(Text, nullable=True)

# Don't create tables on import - do it explicitly
# Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    """Create all database tables"""
    Base.metadata.create_all(bind=engine)
    print("USING DATABASE:", DATABASE_URL)