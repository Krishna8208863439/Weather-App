from typing import Dict, Any

class AIAssistantService:
    def answer_question(self, question: str, weather_data: Dict[str, Any], lang: str = "en") -> Dict[str, Any]:
        q_lower = question.lower()
        curr = weather_data.get("current", {})
        temp = curr.get("temp", 22)
        cond = curr.get("condition", "Clear")
        rain_prob = curr.get("rain_probability", 0)
        humidity = curr.get("humidity", 50)
        wind = curr.get("wind_speed", 10)
        aqi = weather_data.get("air_quality", {}).get("aqi", 40)
        loc = weather_data.get("location", {}).get("name", "your city")

        # Category matching
        if any(w in q_lower for w in ["rain", "umbrella", "shower", "wet", "precipitation"]):
            if rain_prob > 50 or "rain" in cond.lower():
                answer = f"Yes! There is a high chance of rain in {loc} today ({rain_prob}% probability). Definitely bring an umbrella and a waterproof jacket if heading out."
            else:
                answer = f"Unlikely! The rain probability in {loc} is low ({rain_prob}%). You probably won't need an umbrella today."

        elif any(w in q_lower for w in ["cloth", "wear", "dress", "outfit", "jacket"]):
            if temp < 10:
                answer = f"It's cold in {loc} ({temp}°C). Wear warm layers, a heavy coat, scarf, and thermal wear."
            elif temp < 20:
                answer = f"It's mild in {loc} ({temp}°C). A light jacket, sweater, or hoodie over long pants will be very comfortable."
            elif temp < 30:
                answer = f"It's pleasantly warm ({temp}°C). Comfortable cotton T-shirts, shorts, or light trousers are perfect."
            else:
                answer = f"It's hot ({temp}°C). Wear light-colored, loose cotton clothing, sunglasses, and apply sunblock."

        elif any(w in q_lower for w in ["travel", "trip", "drive", "flight", "road"]):
            if wind > 45 or "storm" in cond.lower():
                answer = f"Travel Caution: Hazardous conditions in {loc} due to high wind ({wind} km/h) and storm risks. Postpone non-essential highway travel."
            elif rain_prob > 70:
                answer = f"Travel Advice: Moderate wet road conditions in {loc}. Drive carefully and expect slightly delayed travel times."
            else:
                answer = f"Great weather for travel in {loc}! Clean visibility and pleasant {temp}°C temperatures. Ideal for road trips."

        elif any(w in q_lower for w in ["farm", "crop", "irrigation", "soil", "agriculture"]):
            if rain_prob > 65:
                answer = f"Farming Advice for {loc}: High precipitation expected. Hold off on artificial irrigation to conserve water. Protect vulnerable seedlings from heavy downpours."
            elif temp > 32 and humidity < 40:
                answer = f"Farming Advice for {loc}: Elevated evapotranspiration risk ({temp}°C, {humidity}% humidity). Ensure adequate crop hydration during early morning hours."
            else:
                answer = f"Farming Advice for {loc}: Favorable soil moisture conditions. Suitable window for field fertilizing, harvesting, and planting activities."

        elif any(w in q_lower for w in ["health", "breathe", "asthma", "aqi", "air"]):
            if aqi > 150:
                answer = f"Health Alert for {loc}: Air Quality Index is {aqi} (Unhealthy). Limit strenuous outdoor exercise, wear an N95 mask, and use indoors air purifiers."
            elif aqi > 100:
                answer = f"Health Advice: Moderate AQI ({aqi}). Sensitive groups (asthma, heart conditions) should take frequent breaks during outdoor activities."
            else:
                answer = f"Excellent Health Index! Clean air quality (AQI {aqi}) and comfortable humidity ({humidity}%). Ideal time for outdoor exercise."

        elif any(w in q_lower for w in ["run", "jog", "workout", "sport", "outdoor", "hike"]):
            if temp > 35:
                answer = f"Outdoor Exercise Notice: Avoid peak afternoon workouts ({temp}°C). Exercise early at dawn or late evening to prevent heat stroke."
            elif rain_prob > 80:
                answer = f"Outdoor Exercise Notice: Heavy rain likely. Consider indoor gym, swimming, or home treadmill workouts today."
            else:
                answer = f"Great conditions for outdoor activities in {loc}! {temp}°C with {cond}. Perfect for running, cycling, or tennis."

        else:
            answer = f"In {loc}, it is currently {temp}°C with {cond.lower()}, {humidity}% humidity, and wind speeds around {wind} km/h. Rain probability is {rain_prob}%. Let me know if you need specific advice for travel, outfits, or farming!"

        return {
            "question": question,
            "answer": answer,
            "location": loc,
            "language": lang,
            "context_summary": f"Temp: {temp}°C, Cond: {cond}, AQI: {aqi}"
        }

ai_assistant = AIAssistantService()
