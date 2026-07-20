from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from app.services.weather_service import fetch_weather_data, search_cities

router = APIRouter(prefix="/weather", tags=["Weather"])

@router.get("/forecast")
async def get_forecast(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
    city: Optional[str] = Query("Current Location", description="City Name")
):
    """Get complete real-time weather, 48h hourly, 10d daily, AQI, and UV data"""
    data = await fetch_weather_data(lat, lon, city)
    return data

@router.get("/search")
async def search_location(q: str = Query(..., min_length=2, description="Search query")):
    """Auto-suggest geocoding location search"""
    cities = await search_cities(q)
    return {"query": q, "results": cities}
