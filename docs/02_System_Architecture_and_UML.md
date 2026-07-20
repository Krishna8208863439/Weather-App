# System Architecture & UML Specification
## Advanced AI-Powered Weather Forecasting Application

---

### 1. High-Level Architecture Diagram (Mermaid)

```mermaid
graph TD
    User([User Device / Browser]) -->|HTTPS / REST| ReactFE[React + TypeScript + Vite Frontend]
    ReactFE -->|Speech API| Voice[Web Speech Engine]
    ReactFE -->|Tile Layer Request| Leaflet[Leaflet.js / RainViewer Radar API]
    ReactFE -->|REST API Calls| FastApiBE[FastAPI Python Backend]
    
    subgraph Backend Engine
        FastApiBE --> AuthModule[JWT Auth & User Sync]
        FastApiBE --> WeatherGateway[Open-Meteo REST Gateway]
        FastApiBE --> MLEngine[Scikit-Learn Risk Predictor]
        FastApiBE --> AIAssistant[AI Natural Language Assistant]
        FastApiBE --> PDFGen[ReportLab PDF Generator]
    end

    WeatherGateway -->|HTTP GET| OpenMeteo[Open-Meteo Weather & AQI APIs]
```

---

### 2. Sequence Diagram: Weather Search & ML Risk Computation

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant FE as React Frontend
    participant BE as FastAPI Backend
    participant OM as Open-Meteo API
    participant ML as ML Risk Predictor

    User->>FE: Enter City Name / Click GPS
    FE->>BE: GET /api/v1/weather/search?q=London
    BE->>OM: Geocoding Request
    OM-->>BE: Lat: 51.5074, Lon: -0.1278
    BE-->>FE: Location Results
    FE->>BE: GET /api/v1/weather/forecast?lat=51.5074&lon=-0.1278
    BE->>OM: Forecast & Air Quality Request
    OM-->>BE: Raw Meteorological Data
    BE->>ML: Pass Temp, Humidity, Pressure, Wind
    ML-->>BE: Rain %, Storm Severity, Flood Risk
    BE-->>FE: Consolidated Weather & ML Response
    FE->>User: Render Dashboard, Charts & Radar Map
```

---

### 3. Component Architecture Breakdown
- **Frontend Layer**:
  - `Navbar.tsx`: Search auto-suggest, GPS trigger, theme/unit toggles.
  - `CurrentWeatherCard.tsx`: Hero dashboard display with animated background styling.
  - `ForecastCharts.tsx`: Chart.js interactive hourly graphs.
  - `InteractiveMap.tsx`: Leaflet tile layers with live rain radar.
  - `AIAssistant.tsx`: Chat window with voice recognition & synthesis.
  - `MLRiskPredictor.tsx`: Scikit-learn risk cards.
  - `AirQualityModule.tsx`: Pollutant gauge meters.
- **Backend Services**:
  - `weather_service.py`: Async HTTP gateway for Open-Meteo APIs with WMO code translation.
  - `ml_service.py`: Scikit-Learn RandomForest classifier and regressor models.
  - `ai_assistant_service.py`: Rule-assisted conversational engine.
  - `pdf_service.py`: ReportLab PDF document builder.
