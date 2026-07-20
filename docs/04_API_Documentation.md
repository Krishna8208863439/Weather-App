# REST API Specification & Endpoint Documentation
## Advanced AI-Powered Weather Forecasting Application

**Base URL**: `/api/v1`

---

### 1. Weather Endpoints

#### GET `/weather/forecast`
Fetch real-time weather metrics, 48-hour hourly breakdown, 10-day forecast, and air quality index.

- **Query Parameters**:
  - `lat` (float, required): Latitude (-90.0 to 90.0)
  - `lon` (float, required): Longitude (-180.0 to 180.0)
  - `city` (string, optional): City name display override
- **Response (200 OK)**:
  ```json
  {
    "location": { "name": "New York", "latitude": 40.7128, "longitude": -74.006 },
    "current": {
      "temp": 24.5,
      "feels_like": 25.7,
      "humidity": 62,
      "condition": "Partly Cloudy",
      "wind_speed": 14.5,
      "rain_probability": 20,
      "uv_index": 6
    },
    "air_quality": { "aqi": 45, "pm2_5": 11.2, "category": { "level": "Good" } },
    "hourly": [...],
    "daily": [...]
  }
  ```

#### GET `/weather/search`
Geocoding auto-suggest search endpoint.

- **Query Parameters**:
  - `q` (string, required): Minimum 2 characters search query
- **Response (200 OK)**:
  ```json
  {
    "query": "London",
    "results": [
      { "name": "London", "latitude": 51.5074, "longitude": -0.1278, "country": "United Kingdom" }
    ]
  }
  ```

---

### 2. AI & ML Endpoints

#### POST `/ml/predict`
Run Scikit-Learn ensemble models for atmospheric risk evaluation.

- **Request Body**:
  ```json
  {
    "temp": 28.5,
    "humidity": 78.0,
    "pressure": 1008.2,
    "wind_speed": 35.0
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "model_version": "RandomForest-v2.4",
    "rain_probability": 84.2,
    "storm_severity_index": 68.5,
    "heatwave_risk": 15.0,
    "flood_risk_level": "Moderate",
    "air_quality_trend": "Improving (Strong Ventilation)",
    "recommendation": "High rain probability expected. Carry an umbrella."
  }
  ```

#### POST `/ai/chat`
Ask natural language weather questions to AI Assistant.

- **Request Body**:
  ```json
  {
    "question": "Should I carry an umbrella in London today?",
    "weather_data": { ... }
  }
  ```

---

### 3. Report & Emergency Endpoints

#### POST `/reports/download-pdf`
Returns binary stream of PDF Weather Report (`Content-Type: application/pdf`).

#### GET `/emergency/info`
Returns list of emergency contacts, nearest shelters, and natural disaster survival guides.
