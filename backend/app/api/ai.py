from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Any, Optional
from app.services.ai_assistant_service import ai_assistant

router = APIRouter(prefix="/ai", tags=["AI Assistant"])

class AIQuestionRequest(BaseModel):
    question: str
    weather_data: Dict[str, Any]
    language: Optional[str] = "en"

@router.post("/chat")
async def chat_with_ai(payload: AIQuestionRequest):
    """AI Weather Assistant response endpoint"""
    res = ai_assistant.answer_question(
        question=payload.question,
        weather_data=payload.weather_data,
        lang=payload.language
    )
    return res
