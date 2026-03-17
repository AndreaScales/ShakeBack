from fastapi import APIRouter
from pydantic import BaseModel
from services.ai_service import ask_ai

router = APIRouter(prefix="/job")

class JobRequest(BaseModel):
    resume: str
    job_description: str


@router.post("/match")
def analyze_match(data: JobRequest):

    prompt = f"""
    Compare resume with job description.

    Resume:
    {data.resume}

    Job Description:
    {data.job_description}-----

    Return:
    - Match Score %
    - Missing keywords
    - Resume improvements
    - Cover letter
    """

    return ask_ai(prompt)