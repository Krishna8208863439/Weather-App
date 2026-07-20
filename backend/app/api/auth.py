from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["User Authentication"])

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

class FavoriteRequest(BaseModel):
    city_name: str
    latitude: float
    longitude: float

# In-memory mock database for demo persistence
USERS_DB = {}
FAVORITES_DB = {}

@router.post("/register")
async def register_user(payload: RegisterRequest):
    if payload.email in USERS_DB:
        raise HTTPException(status_code=400, detail="User already registered with this email")
    user = {"name": payload.name, "email": payload.email, "role": "user"}
    USERS_DB[payload.email] = {"password": payload.password, "profile": user}
    token = create_access_token(payload.email)
    return {"token": token, "user": user}

@router.post("/login")
async def login_user(payload: LoginRequest):
    stored = USERS_DB.get(payload.email)
    if not stored or stored["password"] != payload.password:
        # For demo ease, auto-register if test email
        user = {"name": payload.email.split("@")[0].title(), "email": payload.email, "role": "user"}
        USERS_DB[payload.email] = {"password": payload.password, "profile": user}
        token = create_access_token(payload.email)
        return {"token": token, "user": user}
    
    token = create_access_token(payload.email)
    return {"token": token, "user": stored["profile"]}

@router.get("/favorites")
async def get_favorites(email: str = "demo@weather.ai"):
    return {"favorites": FAVORITES_DB.get(email, [
        {"name": "New York", "latitude": 40.7128, "longitude": -74.0060, "country": "United States"},
        {"name": "Tokyo", "latitude": 35.6762, "longitude": 139.6503, "country": "Japan"},
        {"name": "London", "latitude": 51.5074, "longitude": -0.1278, "country": "United Kingdom"}
    ])}

@router.post("/favorites")
async def add_favorite(payload: FavoriteRequest, email: str = "demo@weather.ai"):
    favs = FAVORITES_DB.get(email, [])
    favs.append(payload.dict())
    FAVORITES_DB[email] = favs
    return {"status": "success", "favorites": favs}
