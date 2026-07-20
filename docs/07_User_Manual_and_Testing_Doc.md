# User Manual & Software Testing Document
## Advanced AI-Powered Weather Forecasting Application

---

### Part I: User Operations Manual

#### 1. Searching Weather Locations
1. Click on the search bar in the top navigation bar.
2. Type any city name, zip code, state, or country (e.g., "London", "Tokyo", "Mumbai").
3. Select the target location from the auto-suggest dropdown list.
4. Alternatively, click the **GPS Navigation Icon** in the search bar to detect your current geolocation.

#### 2. Switching Temperature & Theme Modes
- Click **°C / °F Switch** in the top bar to instantly toggle all dashboard temperatures between Celsius and Fahrenheit.
- Click the **Sun / Moon Icon** to toggle between Dark Mode and Light Mode.

#### 3. Using Interactive Weather Radar Maps
1. Scroll to the **Interactive Weather Map** section.
2. Click **Rain Radar** to view live Doppler precipitation movements.
3. Click **Satellite** or **Topo & Temp** to toggle map tile layers.

#### 4. Voice-Enabled AI Assistant
1. Click the floating **AI Bot Icon** in the bottom-right corner.
2. Click the **Microphone Icon** to speak your weather question, or type in the input field.
3. Click quick suggestions like "Will it rain today?" or "What should I wear?".
4. Listen to spoken vocal responses via Speech Synthesis.

#### 5. Downloading PDF Weather Reports
- Click **PDF Report** in the navigation toolbar to download a formal, printable PDF weather summary.

---

### Part II: Test Execution Suite

| Test Case ID | Test Scenario | Steps | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Location Geocoding Search | Type "Paris" in search | Auto-suggest dropdown returns Paris, FR | PASS |
| **TC-02** | Unit Conversion | Click °C/°F switch | Temperatures convert accurately ($F = C \cdot \frac{9}{5} + 32$) | PASS |
| **TC-03** | Leaflet Map Overlay | Switch layer to Satellite | Map tiles dynamically render satellite imagery | PASS |
| **TC-04** | AI Voice Recognition | Speak "Farming advice" | Web Speech converts voice to text & renders advice | PASS |
| **TC-05** | PDF Generation | Click PDF Report | Downloads `Weather_Report_<City>.pdf` file | PASS |
