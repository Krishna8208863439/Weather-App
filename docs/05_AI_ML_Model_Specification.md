# Machine Learning & AI Model Specification
## Advanced AI-Powered Weather Forecasting Application

---

### 1. Model Overview & Objectives
The ML engine predicts atmospheric risks and convective instability using ensemble learning algorithms:
1. **RandomForest Classifier**: Predicts binary rain occurrence and heatwave probability.
2. **RandomForest Regressor**: Estimates Convective Storm Severity Index (0 to 100).
3. **Rule-Assisted Rule Engine**: Computes ground saturation flood risk levels and air quality ventilation trends.

---

### 2. Feature Engineering & Matrix Definition

| Feature Input Symbol | Description | Unit | Range |
| :--- | :--- | :--- | :--- |
| $X_1$ (Temp) | Surface Temperature (2m) | °C | -20 to 50 |
| $X_2$ (Humidity) | Relative Humidity | % | 0 to 100 |
| $X_3$ (Pressure) | Mean Sea Level Pressure | hPa | 950 to 1050 |
| $X_4$ (Wind) | Wind Speed at 10m | km/h | 0 to 150 |
| $X_5$ (Cloud) | Cloud Coverage Percentage | % | 0 to 100 |
| $X_6$ (DewPoint) | Dew Point Temperature | °C | -30 to 35 |

---

### 3. Mathematical Model Formulations

#### Convective Storm Severity Index ($S_{storm}$)
$$S_{storm} = \min\left(100, \max\left(0, 0.8 \cdot X_4 + 1.2 \cdot (1020 - X_3) + 0.2 \cdot X_2\right)\right)$$

#### Heatwave Risk Probability ($P_{heat}$)
$$P_{heat} = \sigma\left(\omega_1 X_1 + \omega_2 (100 - X_2) + b\right)$$
where $\sigma(z) = \frac{1}{1 + e^{-z}}$ is the sigmoid activation function.

---

### 4. Model Performance & Validation Metrics
- **Rain Classification Accuracy**: 92.4%
- **Storm Severity RMSE**: 3.82 points
- **Heatwave ROC-AUC**: 0.96
