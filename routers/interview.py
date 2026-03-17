from fastapi import APIRouter
from pydantic import BaseModel
from services.ai_service import ask_ai

router = APIRouter(prefix="/interview")

class InterviewRequest(BaseModel):
    job_description: str


@router.post("/questions")
def generate_questions(data: InterviewRequest):

    prompt = f"""
    Generate interview questions for this role.

    Job:
    {data.job_description}

    Return:
    Behavioral questions
    Technical questions
    """

    return ask_ai(prompt)