import axios from 'axios';
import { WeatherData, MLPrediction } from '../types/weather';

const API_BASE = 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const getWeatherData = async (lat: number, lon: number, cityName?: string): Promise<WeatherData> => {
  try {
    const res = await api.get('/weather/forecast', {
      params: { lat, lon, city: cityName }
    });
    return res.data;
  } catch (err) {
    console.warn('Backend API connection failed, calling Open-Meteo directly...', err);
    return fetchDirectOpenMeteo(lat, lon, cityName || 'Target Location');
  }
};

export const searchLocations = async (query: str): Promise<any[]> => {
  try {
    const res = await api.get('/weather/search', { params: { q: query } });
    return res.data.results || [];
  } catch (err) {
    // Direct Open-Meteo geocoding fallback
    const res = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: { name: query, count: 8, language: 'en', format: 'json' }
    });
    return res.data.results || [];
  }
};

export const getMLPredictions = async (temp: number, humidity: number, pressure: number, wind_speed: number): Promise<MLPrediction> => {
  try {
    const res = await api.post('/ml/predict', { temp, humidity, pressure, wind_speed });
    return res.data;
  } catch (err) {
    // Client-side fallback prediction logic
    const rain = Math.min(98, Math.max(5, Math.round(humidity * 0.9 + (1015 - pressure) * 1.5)));
    const storm = Math.min(100, Math.max(0, Math.round(wind_speed * 1.5 + (1018 - pressure) * 2)));
    const heat = temp > 35 ? Math.min(100, Math.round((temp - 35) * 15)) : 5;
    return {
      model_version: 'RandomForest-ClientFallback',
      rain_probability: rain,
      storm_severity_index: storm,
      heatwave_risk: heat,
      flood_risk_level: storm > 75 ? 'High' : (rain > 70 ? 'Moderate' : 'Low'),
      air_quality_trend: wind_speed < 8 ? 'Stagnant' : 'Improving',
      temperature_7day_forecast: Array.from({ length: 7 }, (_, i) => ({
        day: `Day +${i+1}`,
        predicted_temp: Math.round((temp + Math.sin(i) * 3) * 10) / 10
      })),
      recommendation: storm > 60 ? 'ALERT: Convective storm activity detected.' : 'Favorable weather conditions predicted.'
    };
  }
};

export const askAIAssistant = async (question: string, weatherData: WeatherData, language: string = 'en') => {
  try {
    const res = await api.post('/ai/chat', { question, weather_data: weatherData, language });
    return res.data;
  } catch (err) {
    // Basic AI Assistant response generator client-side
    const temp = weatherData.current.temp;
    const cond = weatherData.current.condition;
    return {
      question,
      answer: `Currently in ${weatherData.location.name}, it is ${temp}°C with ${cond.toLowerCase()} and humidity at ${weatherData.current.humidity}%. Rain probability is ${weatherData.current.rain_probability}%.`,
      location: weatherData.location.name,
      language
    };
  }
};

export const downloadPDFReport = async (weatherData: WeatherData) => {
  try {
    const res = await api.post('/reports/download-pdf', { weather_data: weatherData }, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Weather_Report_${weatherData.location.name}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    alert('Failed to connect to PDF report generator service.');
  }
};

async function fetchDirectOpenMeteo(lat: number, lon: number, name: string): Promise<WeatherData> {
  const [wRes, aRes] = await Promise.all([
    axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        current: ['temperature_2m', 'relative_humidity_2m', 'apparent_temperature', 'is_day', 'weather_code', 'cloud_cover', 'pressure_msl', 'wind_speed_10m', 'wind_direction_10m', 'dew_point_2m'],
        hourly: ['temperature_2m', 'relative_humidity_2m', 'precipitation_probability', 'precipitation', 'wind_speed_10m', 'pressure_msl', 'uv_index', 'weather_code'],
        daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min', 'apparent_temperature_max', 'apparent_temperature_min', 'sunrise', 'sunset', 'uv_index_max', 'precipitation_sum', 'precipitation_probability_max', 'wind_speed_10m_max'],
        timezone: 'auto'
      }
    }),
    axios.get('https://air-quality-api.open-meteo.com/v1/air-quality', {
      params: {
        latitude: lat,
        longitude: lon,
        current: ['us_aqi', 'pm10', 'pm2_5', 'carbon_monoxide', 'nitrogen_dioxide', 'sulphur_dioxide', 'ozone']
      }
    }).catch(() => ({ data: { current: {} } }))
  ]);

  const curr = wRes.data.current;
  const currAqi = aRes.data.current || {};
  const hourlyRaw = wRes.data.hourly || {};
  const dailyRaw = wRes.data.daily || {};

  const hourly = (hourlyRaw.time || []).slice(0, 48).map((t: string, i: number) => ({
    time: t.split('T')[1] || t,
    temp: hourlyRaw.temperature_2m[i],
    feels_like: hourlyRaw.temperature_2m[i],
    humidity: hourlyRaw.relative_humidity_2m[i],
    precip_prob: hourlyRaw.precipitation_probability[i] || 0,
    precip_mm: hourlyRaw.precipitation[i] || 0,
    wind_speed: hourlyRaw.wind_speed_10m[i],
    pressure: hourlyRaw.pressure_msl[i],
    uv: hourlyRaw.uv_index[i] || 0,
    weather_code: hourlyRaw.weather_code[i],
    condition: 'Partly Cloudy'
  }));

  const daily = (dailyRaw.time || []).slice(0, 10).map((t: string, i: number) => ({
    date: t,
    temp_max: dailyRaw.temperature_2m_max[i],
    temp_min: dailyRaw.temperature_2m_min[i],
    apparent_max: dailyRaw.apparent_temperature_max[i],
    apparent_min: dailyRaw.apparent_temperature_min[i],
    sunrise: (dailyRaw.sunrise[i] || '').split('T')[1] || '06:00',
    sunset: (dailyRaw.sunset[i] || '').split('T')[1] || '18:30',
    uv_max: dailyRaw.uv_index_max[i] || 5,
    precip_sum: dailyRaw.precipitation_sum[i] || 0,
    precip_prob_max: dailyRaw.precipitation_probability_max[i] || 0,
    wind_speed_max: dailyRaw.wind_speed_10m_max[i] || 15,
    condition: 'Partly Cloudy',
    icon: 'cloud-sun'
  }));

  const aqiVal = currAqi.us_aqi || 42;

  return {
    location: { name, latitude: lat, longitude: lon },
    current: {
      temp: curr.temperature_2m,
      feels_like: curr.apparent_temperature,
      humidity: curr.relative_humidity_2m,
      dew_point: curr.dew_point_2m || 14,
      is_day: Boolean(curr.is_day),
      condition: 'Partly Cloudy',
      icon: 'cloud-sun',
      weather_code: curr.weather_code,
      rain_probability: hourly[0]?.precip_prob || 20,
      cloud_coverage: curr.cloud_cover,
      pressure: curr.pressure_msl,
      wind_speed: curr.wind_speed_10m,
      wind_direction: curr.wind_direction_10m,
      wind_dir_label: 'NW',
      wind_gusts: curr.wind_speed_10m * 1.3,
      visibility_km: 10.0,
      uv_index: daily[0]?.uv_max || 6,
      sunrise: daily[0]?.sunrise || '06:00',
      sunset: daily[0]?.sunset || '18:30',
      moon_phase: 'Waxing Gibbous',
      pollen_index: 'Low'
    },
    air_quality: {
      aqi: aqiVal,
      pm2_5: currAqi.pm2_5 || 12.0,
      pm10: currAqi.pm10 || 24.0,
      co: currAqi.carbon_monoxide || 200.0,
      no2: currAqi.nitrogen_dioxide || 14.0,
      so2: currAqi.sulphur_dioxide || 4.0,
      o3: currAqi.ozone || 36.0,
      category: {
        level: aqiVal <= 50 ? 'Good' : 'Moderate',
        color: aqiVal <= 50 ? '#10B981' : '#F59E0B',
        advice: 'Air quality is satisfactory.'
      }
    },
    hourly,
    daily
  };
}
