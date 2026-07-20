export interface LocationInfo {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  country_code?: string;
  timezone?: string;
  elevation?: number;
}

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  dew_point: number;
  is_day: boolean;
  condition: string;
  icon: string;
  weather_code: number;
  rain_probability: number;
  cloud_coverage: number;
  pressure: number;
  wind_speed: number;
  wind_direction: number;
  wind_dir_label: string;
  wind_gusts: number;
  visibility_km: number;
  uv_index: number;
  sunrise: string;
  sunset: string;
  moon_phase: string;
  pollen_index: string;
}

export interface AQICategory {
  level: string;
  color: string;
  advice: string;
}

export interface AirQuality {
  aqi: number;
  pm2_5: number;
  pm10: number;
  co: number;
  no2: number;
  so2: number;
  o3: number;
  category: AQICategory;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  feels_like: number;
  humidity: number;
  precip_prob: number;
  precip_mm: number;
  wind_speed: number;
  pressure: number;
  uv: number;
  weather_code: number;
  condition: string;
}

export interface DailyForecast {
  date: string;
  temp_max: number;
  temp_min: number;
  apparent_max: number;
  apparent_min: number;
  sunrise: string;
  sunset: string;
  uv_max: number;
  precip_sum: number;
  precip_prob_max: number;
  wind_speed_max: number;
  condition: string;
  icon: string;
}

export interface WeatherData {
  location: LocationInfo;
  current: CurrentWeather;
  air_quality: AirQuality;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

export interface MLPrediction {
  model_version: string;
  rain_probability: number;
  storm_severity_index: number;
  heatwave_risk: number;
  flood_risk_level: string;
  air_quality_trend: string;
  temperature_7day_forecast: { day: string; predicted_temp: number }[];
  recommendation: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
}
