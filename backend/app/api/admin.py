from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["Admin Panel"])

@router.get("/metrics")
async def get_admin_metrics():
    """System monitoring metrics, API health, and user statistics"""
    return {
        "system_status": "Healthy",
        "uptime_pct": 99.98,
        "active_users_today": 1420,
        "total_api_requests_24h": 48920,
        "cache_hit_ratio_pct": 94.2,
        "api_health": [
            {"api": "Open-Meteo Weather API", "status": "Operational", "latency_ms": 82},
            {"api": "Open-Meteo AQI Service", "status": "Operational", "latency_ms": 64},
            {"api": "Geocoding Engine", "status": "Operational", "latency_ms": 45},
            {"api": "ML Risk Engine", "status": "Operational", "latency_ms": 12}
        ],
        "recent_alerts_sent": 84
    }
