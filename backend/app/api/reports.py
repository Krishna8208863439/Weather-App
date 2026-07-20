from fastapi import APIRouter, Response
from pydantic import BaseModel
from typing import Dict, Any
from app.services.pdf_service import generate_weather_pdf_report

router = APIRouter(prefix="/reports", tags=["Reports"])

class ReportRequest(BaseModel):
    weather_data: Dict[str, Any]

@router.post("/download-pdf")
async def download_weather_pdf(payload: ReportRequest):
    """Generate and return a downloadable PDF weather report"""
    pdf_bytes = generate_weather_pdf_report(payload.weather_data)
    loc = payload.weather_data.get("location", {}).get("name", "weather").replace(" ", "_")
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=Weather_Report_{loc}.pdf"}
    )
