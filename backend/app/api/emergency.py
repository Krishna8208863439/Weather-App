from fastapi import APIRouter

router = APIRouter(prefix="/emergency", tags=["Emergency Module"])

@router.get("/info")
async def get_emergency_info():
    """Emergency contacts, shelter guides, and safety protocols"""
    return {
        "contacts": [
            {"service": "National Emergency Helpline", "phone": "911 / 112"},
            {"service": "Disaster Response Force", "phone": "1-800-DISASTER"},
            {"service": "Coast Guard Rescue", "phone": "1-800-555-COAST"},
            {"service": "Medical & Ambulance Response", "phone": "108 / 911"}
        ],
        "safety_guides": [
            {
                "disaster": "Severe Thunderstorm & Lightning",
                "tips": [
                    "Seek shelter inside a sturdy building immediately.",
                    "Unplug electronics and avoid using corded phones.",
                    "Stay away from tall trees, metal poles, and open bodies of water."
                ]
            },
            {
                "disaster": "Extreme Heatwave",
                "tips": [
                    "Drink plenty of water even if you do not feel thirsty.",
                    "Avoid direct sunlight during 11 AM to 4 PM.",
                    "Check on elderly neighbors and outdoor pets."
                ]
            },
            {
                "disaster": "Flash Flood Warning",
                "tips": [
                    "Move to higher ground immediately; do not walk through moving water.",
                    "Never drive around barricades or into flooded roads.",
                    "Keep emergency survival kit and flashlights ready."
                ]
            }
        ],
        "nearest_shelters": [
            {"name": "Central Municipal Emergency Shelter", "address": "450 Civil Center Plaza", "distance_km": 2.4, "capacity_available": "120 beds"},
            {"name": "Community Red Cross Station", "address": "12 Safety Blvd", "distance_km": 4.1, "capacity_available": "85 beds"}
        ]
    }
