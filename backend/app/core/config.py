import os
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "AI Weather Forecasting Application"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-weather-ai-key-2026-antigravity")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # External API defaults
    OPEN_METEO_BASE: str = "https://api.open-meteo.com/v1"
    OPEN_METEO_GEO: str = "https://geocoding-api.open-meteo.com/v1"
    OPEN_METEO_AQI: str = "https://air-quality-api.open-meteo.com/v1"
    OPENWEATHER_API_KEY: str = os.getenv("OPENWEATHER_API_KEY", "")

settings = Settings()
