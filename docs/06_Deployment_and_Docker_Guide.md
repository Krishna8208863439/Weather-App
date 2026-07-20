# Deployment & Docker Configuration Guide
## Advanced AI-Powered Weather Forecasting Application

---

### 1. Prerequisites
- Docker Engine v24.0+
- Docker Compose v2.20+
- Python 3.11+ (for local non-docker backend development)
- Node.js v20+ (for local non-docker frontend development)

---

### 2. Single-Command Docker Deployment

To build and launch the full-stack system using Docker Compose:

```bash
# Navigate to docker directory
cd docker

# Launch containers in detached mode
docker-compose up --build -d
```

- **Frontend Container**: Runs Nginx serving React production bundle at `http://localhost:3000`
- **Backend Container**: Runs Uvicorn serving FastAPI at `http://localhost:8000`

---

### 3. Manual Local Development Setup

#### Step A: Launch Backend (FastAPI)
```bash
cd backend
python -m venv venv
# Windows PowerShell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Start Uvicorn Dev Server
python app/main.py
```
FastAPI Swagger documentation will be live at `http://localhost:8000/docs`.

#### Step B: Launch Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
React application will be live at `http://localhost:3000`.
