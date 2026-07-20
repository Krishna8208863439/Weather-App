# 🌤️ Aura Weather AI - Advanced AI-Powered Weather Forecasting Application

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111.0-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.5.1-F7931E.svg?logo=scikit-learn)](https://scikit-learn.org/)

**Aura Weather AI** is a production-ready, feature-rich weather forecasting platform built with a high-performance **FastAPI (Python)** backend and a stunning **React (TypeScript + Vite)** frontend. It provides real-time meteorological metrics, 48-hour & 10-day forecasts, interactive Leaflet Doppler rain radar maps, Scikit-Learn machine learning risk analytics, a voice-enabled AI assistant, and downloadable PDF weather reports.

---

## 🚀 Key Features

* **Glassmorphism Design System**: Sleek glass cards, dynamic condition-based background gradients (Sun, Rain, Thunderstorm, Overcast), dark/light mode toggles, and smooth micro-animations.
* **Comprehensive Dashboard**: Live Temperature, Feels Like, Min/Max, Humidity, Wind Speed & Direction, Pressure, Visibility, UV Index, Dew Point, Sunrise/Sunset, Moon Phase, Pollen Index, and Air Quality Index (AQI).
* **48-Hour Hourly Charts**: Interactive Chart.js graph tabs for Temperature, Rain Probability, Wind Speed, and Humidity trends.
* **10-Day Daily Forecast**: Expandable outlook cards detailing precipitation sums, apparent ranges, wind gusts, and UV max.
* **Interactive Weather Maps**: Leaflet.js map with live RainViewer Doppler precipitation radar tiles, Satellite view, and Topographic Temperature layers.
* **Air Quality (AQI) Module**: US AQI score visualizer gauge with PM2.5, PM10, CO, NO₂, SO₂, and O₃ pollutant meters plus health guidance.
* **Scikit-Learn ML Risk Predictor**: Ensemble machine learning models predicting 24-hour Rain probability, Convective Storm Severity Index (0-100), Heatwave risk %, Flood level, and Air quality trends.
* **Voice-Enabled AI Weather Assistant**: Floating conversational chatbot with Web Speech API speech-to-text input, text-to-speech voice output, and quick contextual prompts (clothing, farming, travel advice).
* **Downloadable PDF Reports**: Dynamic PDF weather report generation engine.
* **Search & GPS Geolocation**: Auto-suggest location search by city, zip code, state, or country, plus browser GPS detection.
* **User & Admin Panels**: User favorites location sync and admin system operations monitoring modal.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS (Glassmorphic design system)
- **Data Visualization**: Chart.js (`react-chartjs-2`)
- **Mapping**: Leaflet.js (`react-leaflet`) with RainViewer Radar layers
- **Icons & Animations**: Lucide Icons, Framer Motion
- **HTTP & Speech**: Axios, Web Speech API

### Backend
- **Framework**: FastAPI (Python 3.11), Uvicorn
- **AI & ML Engine**: Scikit-Learn (RandomForest Classifier & Regressor), NumPy, Pandas
- **PDF Generation**: ReportLab
- **Security & Auth**: JWT Tokens (`python-jose`), Passlib (bcrypt)
- **Data Source**: Open-Meteo REST Weather & Air Quality APIs (No API key required)

---

## 📂 Project Architecture & Deliverables

```
Weather App/
├── backend/
│   ├── app/
│   │   ├── api/          # FastAPI Routers (weather, ai, ml, reports, auth, news, emergency, admin)
│   │   ├── core/         # Settings & JWT security
│   │   ├── services/     # Weather API gateway, ML risk predictor, AI assistant, PDF generator
│   │   └── main.py       # FastAPI application entrypoint
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/   # UI components (Navbar, Weather Cards, Charts, Map, AIAssistant, AQI, etc.)
│   │   ├── services/     # Axios API service client
│   │   ├── types/        # TypeScript interfaces
│   │   └── App.tsx       # Main layout container
│   ├── package.json
│   └── tailwind.config.js
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
└── docs/                 # Complete Deliverables (SRS, ERD, Architecture, IEEE Paper, PPT Deck)
```

---

## 💻 Quick Start

### 1. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
# On Windows: .\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --port 8000 --reload
```
*Swagger API Documentation live at `http://127.0.0.1:8000/docs`.*

### 2. Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
*Web Application live at `http://localhost:3000`.*

---

## 📜 Documentation Deliverables
The repository includes complete academic & engineering deliverables in the [`docs/`](./docs) folder:
1. `01_Software_Requirement_Specification_SRS.md`
2. `02_System_Architecture_and_UML.md`
3. `03_Database_Schema_and_ERD.md`
4. `04_API_Documentation.md`
5. `05_AI_ML_Model_Specification.md`
6. `06_Deployment_and_Docker_Guide.md`
7. `07_User_Manual_and_Testing_Doc.md`
8. `08_IEEE_Research_Paper_Draft.md`
9. `09_Project_Report.md`
10. `10_PowerPoint_Presentation_Deck.md`

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for details.
