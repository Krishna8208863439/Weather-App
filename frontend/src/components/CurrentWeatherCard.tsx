import React from 'react';
import { WeatherData } from '../types/weather';
import { 
  Wind, Droplets, Gauge, Sun, Eye, CloudRain, Sunrise, Sunset, 
  Compass, Thermometer, Moon, ShieldAlert, Sparkles 
} from 'lucide-react';

interface CurrentWeatherCardProps {
  data: WeatherData;
  unit: 'C' | 'F';
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ data, unit }) => {
  const { current, location, air_quality } = data;

  const convertTemp = (c: number) => {
    if (unit === 'F') {
      return Math.round((c * 9/5) + 32);
    }
    return Math.round(c);
  };

  const getBgGradient = (wcode: number) => {
    if (wcode >= 95) return 'from-purple-900 via-indigo-950 to-slate-950';
    if (wcode >= 51 && wcode <= 82) return 'from-slate-800 via-sky-950 to-slate-950';
    if (wcode === 0 || wcode === 1) return 'from-blue-600 via-indigo-900 to-slate-950';
    return 'from-slate-800 via-slate-900 to-slate-950';
  };

  return (
    <div className={`relative w-full rounded-3xl p-6 md:p-8 bg-gradient-to-br ${getBgGradient(current.weather_code)} border border-slate-700/60 shadow-2xl overflow-hidden`}>
      {/* Background Animated Orbs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>

      {/* Hero Header & Main Temperature */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Live Forecast • {location.name}
            </span>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-6xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              {convertTemp(current.temp)}°{unit}
            </span>
            <div className="space-y-1">
              <div className="text-xl md:text-2xl font-semibold text-slate-200">{current.condition}</div>
              <div className="text-sm text-slate-400">
                Feels like <span className="font-semibold text-slate-200">{convertTemp(current.feels_like)}°{unit}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-300 max-w-md">
            Atmospheric conditions in {location.name} show humidity at {current.humidity}% with winds blowing {current.wind_dir_label} at {current.wind_speed} km/h.
          </p>
        </div>

        {/* Highlighted Primary Badges */}
        <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="glass-card p-4 rounded-2xl flex flex-col justify-between">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-medium">Air Quality</span>
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-emerald-400">{air_quality.aqi}</span>
              <p className="text-[11px] text-slate-400 font-medium">{air_quality.category.level}</p>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl flex flex-col justify-between">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-medium">Rain Prob.</span>
              <CloudRain className="w-4 h-4 text-sky-400" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-sky-300">{current.rain_probability}%</span>
              <p className="text-[11px] text-slate-400 font-medium">Precipitation</p>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl flex flex-col justify-between">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-medium">UV Index</span>
              <Sun className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-amber-300">{current.uv_index}</span>
              <p className="text-[11px] text-slate-400 font-medium">
                {current.uv_index > 7 ? 'Very High' : (current.uv_index > 4 ? 'Moderate' : 'Low')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Weather Metrics Cards */}
      <div className="relative z-10 mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {/* Humidity */}
        <div className="glass-card p-3.5 rounded-2xl space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Droplets className="w-4 h-4 text-blue-400" />
            <span>Humidity</span>
          </div>
          <p className="text-lg font-bold text-slate-100">{current.humidity}%</p>
        </div>

        {/* Wind */}
        <div className="glass-card p-3.5 rounded-2xl space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Wind className="w-4 h-4 text-cyan-400" />
            <span>Wind Speed</span>
          </div>
          <p className="text-lg font-bold text-slate-100">{current.wind_speed} <span className="text-xs font-normal">km/h</span></p>
          <span className="text-[10px] text-slate-400">{current.wind_dir_label} ({current.wind_direction}°)</span>
        </div>

        {/* Pressure */}
        <div className="glass-card p-3.5 rounded-2xl space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Gauge className="w-4 h-4 text-indigo-400" />
            <span>Pressure</span>
          </div>
          <p className="text-lg font-bold text-slate-100">{current.pressure} <span className="text-xs font-normal">hPa</span></p>
        </div>

        {/* Dew Point */}
        <div className="glass-card p-3.5 rounded-2xl space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Thermometer className="w-4 h-4 text-teal-400" />
            <span>Dew Point</span>
          </div>
          <p className="text-lg font-bold text-slate-100">{convertTemp(current.dew_point)}°{unit}</p>
        </div>

        {/* Visibility */}
        <div className="glass-card p-3.5 rounded-2xl space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>Visibility</span>
          </div>
          <p className="text-lg font-bold text-slate-100">{current.visibility_km} <span className="text-xs font-normal">km</span></p>
        </div>

        {/* Moon Phase */}
        <div className="glass-card p-3.5 rounded-2xl space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Moon className="w-4 h-4 text-purple-400" />
            <span>Moon Phase</span>
          </div>
          <p className="text-sm font-bold text-slate-100 truncate">{current.moon_phase}</p>
        </div>

        {/* Sunrise */}
        <div className="glass-card p-3.5 rounded-2xl space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Sunrise className="w-4 h-4 text-amber-400" />
            <span>Sunrise</span>
          </div>
          <p className="text-sm font-bold text-slate-100">{current.sunrise}</p>
        </div>

        {/* Sunset */}
        <div className="glass-card p-3.5 rounded-2xl space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Sunset className="w-4 h-4 text-orange-400" />
            <span>Sunset</span>
          </div>
          <p className="text-sm font-bold text-slate-100">{current.sunset}</p>
        </div>
      </div>
    </div>
  );
};
