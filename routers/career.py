from fastapi import APIRouter
from pydantic import BaseModel
from services.ai_service import ask_ai

router = APIRouter(prefix="/career")

class CareerRequest(BaseModel):
    resume_summary: str
    career_goal: str


@router.post("/plan")
def generate_plan(data: CareerRequest):

    prompt = f"""
    Generate a 30-day job search strategy.

    Background:
    {data.resume_summary}

    Goal:
    {data.career_goal}

    Return:
    Week 1
    Week 2
    Week 3
    Week 4
    """

    return ask_ai(prompt)