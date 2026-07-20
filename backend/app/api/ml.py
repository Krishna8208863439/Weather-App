from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ml_service import ml_predictor

router = APIRouter(prefix="/ml", tags=["ML Risk Predictions"])

class MLPredictRequest(BaseModel):
    temp: float
    humidity: float
    pressure: float
    wind_speed: float
    cloud_cover: float = 50.0
    dew_point: float = 15.0

@router.post("/predict")
async def predict_risks(payload: MLPredictRequest):
    """Run Scikit-learn ensemble models for rain, storm severity, heatwave, and AQI trend predictions"""
    res = ml_predictor.predict_weather_risks(
        temp=payload.temp,
        humidity=payload.humidity,
        pressure=payload.pressure,
        wind_speed=payload.wind_speed,
        cloud_cover=payload.cloud_cover,
        dew_point=payload.dew_point
    )
    return res
