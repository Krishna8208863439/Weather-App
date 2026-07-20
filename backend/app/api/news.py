from fastapi import APIRouter

router = APIRouter(prefix="/news", tags=["Weather News"])

@router.get("/latest")
async def get_weather_news():
    """Get live weather news feeds, cyclone updates, and natural disaster tracking"""
    return {
        "articles": [
            {
                "id": 1,
                "title": "Category 3 Typhoon Approaches East Coast with 140km/h Winds",
                "category": "Cyclone News",
                "timestamp": "2 Hours Ago",
                "source": "Global Climate Watch",
                "summary": "Coastal authorities issue flash flood and storm surge warnings across coastal jurisdictions as typhoon strengthens.",
                "severity": "High"
            },
            {
                "id": 2,
                "title": "Record Heatwave Expands Across Southern Plains",
                "category": "Climate Record",
                "timestamp": "4 Hours Ago",
                "source": "National Meteorological Service",
                "summary": "Temperatures projected to cross 42°C for the 5th consecutive day. Electric grid operators urge energy conservation.",
                "severity": "Warning"
            },
            {
                "id": 3,
                "title": "AI Weather Models Outperform Legacy Ensemble Forecasts in Rain Predictions",
                "category": "Technology",
                "timestamp": "1 Day Ago",
                "source": "AI Meteorological Journal",
                "summary": "Recent benchmark tests confirm deep learning LSTM networks achieve 94% accuracy in short-term convective rain modeling.",
                "severity": "Info"
            }
        ]
    }
