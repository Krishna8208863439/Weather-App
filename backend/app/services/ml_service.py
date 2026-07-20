import numpy as np
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from typing import Dict, Any

class WeatherMLPredictor:
    def __init__(self):
        self._train_dummy_models()

    def _train_dummy_models(self):
        """Train lightweight ensemble ML models on atmospheric feature matrices"""
        np.random.seed(42)
        # Features: [temp, humidity, pressure, wind_speed, cloud_cover, dew_point]
        X = np.random.uniform(low=[ -10, 10, 970, 0, 0, -15 ], high=[ 45, 100, 1040, 80, 100, 30 ], size=(500, 6))
        
        # Target 1: Rain occurrence (0 or 1) based on humidity, pressure drop, cloud cover
        y_rain = ((X[:, 1] > 65) & (X[:, 4] > 60) & (X[:, 2] < 1015)).astype(int)
        
        # Target 2: Storm Severity Index (0 - 100)
        y_storm = np.clip(X[:, 3] * 0.8 + (1020 - X[:, 2]) * 1.2 + X[:, 1] * 0.2, 0, 100)

        # Target 3: Heatwave Risk (0 or 1)
        y_heatwave = ((X[:, 0] > 36) & (X[:, 1] < 45)).astype(int)

        self.rain_model = RandomForestClassifier(n_estimators=20, random_state=42)
        self.rain_model.fit(X, y_rain)

        self.storm_model = RandomForestRegressor(n_estimators=20, random_state=42)
        self.storm_model.fit(X, y_storm)

        self.heatwave_model = RandomForestClassifier(n_estimators=20, random_state=42)
        self.heatwave_model.fit(X, y_heatwave)

    def predict_weather_risks(self, temp: float, humidity: float, pressure: float, wind_speed: float, cloud_cover: float, dew_point: float) -> Dict[str, Any]:
        features = np.array([[temp, humidity, pressure, wind_speed, cloud_cover, dew_point]])
        
        rain_prob_pct = float(self.rain_model.predict_proba(features)[0][1] * 100)
        storm_score = float(np.clip(self.storm_model.predict(features)[0], 0, 100))
        heatwave_prob_pct = float(self.heatwave_model.predict_proba(features)[0][1] * 100)

        # Heuristic calculations for flood & AQI trend
        flood_risk = "Low"
        if rain_prob_pct > 80 and humidity > 85:
            flood_risk = "High" if storm_score > 60 else "Moderate"
        elif storm_score > 80:
            flood_risk = "Critical"

        aqi_trend = "Stable"
        if wind_speed < 5 and humidity > 70:
            aqi_trend = "Deteriorating (Stagnant Air)"
        elif wind_speed > 20:
            aqi_trend = "Improving (Strong Ventilation)"

        temp_trend = []
        for d in range(1, 8):
            trend_val = temp + np.sin(d * 0.8) * 2.5 + (1.5 if pressure < 1010 else -1.0)
            temp_trend.append({"day": f"Day +{d}", "predicted_temp": round(trend_val, 1)})

        return {
            "model_version": "RandomForest-v2.4",
            "rain_probability": round(rain_prob_pct, 1),
            "storm_severity_index": round(storm_score, 1),
            "heatwave_risk": round(heatwave_prob_pct, 1),
            "flood_risk_level": flood_risk,
            "air_quality_trend": aqi_trend,
            "temperature_7day_forecast": temp_trend,
            "recommendation": self._get_ml_recommendation(rain_prob_pct, storm_score, heatwave_prob_pct)
        }

    def _get_ml_recommendation(self, rain: float, storm: float, heatwave: float) -> str:
        if storm > 70:
            return "ALERT: High risk of convective storms! Secure outdoor property and stay tuned for weather warnings."
        elif heatwave > 60:
            return "WARNING: Elevated heatwave probability. Drink plenty of water and avoid mid-day sun exposure."
        elif rain > 75:
            return "NOTICE: High rain probability expected. Carry an umbrella and plan indoor activities."
        else:
            return "OPTIMAL: Favorable weather conditions predicted for outdoor plans."

ml_predictor = WeatherMLPredictor()
