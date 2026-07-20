import React from 'react';
import { AirQuality } from '../types/weather';
import { Activity, ShieldCheck, HeartPulse, AlertTriangle } from 'lucide-react';

interface AirQualityModuleProps {
  airQuality: AirQuality;
}

export const AirQualityModule: React.FC<AirQualityModuleProps> = ({ airQuality }) => {
  const { aqi, pm2_5, pm10, co, no2, so2, o3, category } = airQuality;

  const getPercentage = (val: number, maxVal: number) => {
    return Math.min(100, Math.round((val / maxVal) * 100));
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-700/60 shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-slate-100">Air Quality & Health Index (AQI)</h3>
        </div>
        <span
          className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
          style={{ backgroundColor: `${category.color}25`, color: category.color, border: `1px solid ${category.color}50` }}
        >
          {category.level}
        </span>
      </div>

      {/* Main AQI Score Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-900/60 rounded-2xl border border-slate-800 text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">US Air Quality Index</span>
          <span className="text-5xl font-extrabold my-2" style={{ color: category.color }}>
            {aqi}
          </span>
          <p className="text-xs text-slate-300 max-w-xs">{category.advice}</p>
        </div>

        {/* Pollutants Progress Bars */}
        <div className="md:col-span-7 grid grid-cols-2 gap-3">
          <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-400">PM2.5</span>
              <span className="text-slate-200">{pm2_5} µg/m³</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: `${getPercentage(pm2_5, 75)}%` }} />
            </div>
          </div>

          <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-400">PM10</span>
              <span className="text-slate-200">{pm10} µg/m³</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-sky-500 h-full" style={{ width: `${getPercentage(pm10, 150)}%` }} />
            </div>
          </div>

          <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-400">CO (Carbon Monoxide)</span>
              <span className="text-slate-200">{co} µg/m³</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full" style={{ width: `${getPercentage(co, 500)}%` }} />
            </div>
          </div>

          <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-400">NO₂ (Nitrogen Dioxide)</span>
              <span className="text-slate-200">{no2} µg/m³</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full" style={{ width: `${getPercentage(no2, 100)}%` }} />
            </div>
          </div>

          <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-400">SO₂ (Sulfur Dioxide)</span>
              <span className="text-slate-200">{so2} µg/m³</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full" style={{ width: `${getPercentage(so2, 50)}%` }} />
            </div>
          </div>

          <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-400">O₃ (Ozone)</span>
              <span className="text-slate-200">{o3} µg/m³</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-500 h-full" style={{ width: `${getPercentage(o3, 120)}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
