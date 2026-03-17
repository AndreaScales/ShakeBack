from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routers import resume, career, job, interview, applications
from models import create_tables, Base, engine

# Load environment variables
load_dotenv()

# Create database tables
create_tables()

app = FastAPI(title="ShakeBack API", description="AI-powered career assistant for job seekers")

# Add CORS middleware BEFORE routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Explicitly allow OPTIONS
    allow_headers=["*"],  # Allows all headers
)

app.include_router(resume.router)
app.include_router(career.router)
app.include_router(job.router)
app.include_router(interview.router)
app.include_router(applications.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to ShakeBack API", "version": "1.0.0"}

Base.metadata.create_all(bind=engine)