from fastapi import APIRouter
from pydantic import BaseModel
from services.ai_service import ask_ai

router = APIRouter(prefix="/resume")

class ResumeRequest(BaseModel):
    resume_text: str

@router.post("/analyze")
def analyze_resume(data: ResumeRequest):

    prompt = f"""
    Analyze this resume.

    Resume:
    {data.resume_text}

    Return:
    - Skills summary
    - Strengths
    - Improvement suggestions
    """

    result = ask_ai(prompt)

    return result