import React, { useState } from 'react';
import { DailyForecast as DailyType } from '../types/weather';
import { Sun, CloudRain, Wind, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

interface DailyForecastProps {
  daily: DailyType[];
  unit: 'C' | 'F';
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ daily, unit }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const convertTemp = (c: number) => {
    return unit === 'F' ? Math.round((c * 9/5) + 32) : Math.round(c);
  };

  const formatDate = (dStr: string) => {
    try {
      const dt = new Date(dStr);
      return dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch {
      return dStr;
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-700/60 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-bold text-slate-100">10-Day Daily Forecast</h3>
        </div>
        <span className="text-xs text-slate-400 font-medium">Extended Outlook</span>
      </div>

      <div className="space-y-2.5">
        {daily.slice(0, 10).map((day, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl p-4 transition duration-200 hover:bg-slate-800/60"
            >
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="flex items-center justify-between cursor-pointer"
              >
                {/* Date & Condition */}
                <div className="flex items-center gap-3 w-1/3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-xl">
                    {day.precip_prob_max > 60 ? '🌧️' : (day.precip_prob_max > 30 ? '⛅' : '☀️')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{formatDate(day.date)}</p>
                    <p className="text-xs text-slate-400">{day.condition}</p>
                  </div>
                </div>

                {/* Rain Probability Bar */}
                <div className="hidden sm:flex items-center gap-2 w-1/4">
                  <CloudRain className="w-3.5 h-3.5 text-indigo-400" />
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                      style={{ width: `${day.precip_prob_max}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-indigo-300 w-8">{day.precip_prob_max}%</span>
                </div>

                {/* Min / Max Temp */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-100">{convertTemp(day.temp_max)}°</span>
                  <span className="text-xs text-slate-400">{convertTemp(day.temp_min)}°</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 ml-2" />
                  )}
                </div>
              </div>

              {/* Expandable Breakdown */}
              {isExpanded && (
                <div className="mt-4 pt-3 border-t border-slate-700/50 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
                  <div className="bg-slate-900/60 p-2.5 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Apparent Range</span>
                    <span className="font-semibold text-slate-200">{convertTemp(day.apparent_min)}° - {convertTemp(day.apparent_max)}°</span>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Precipitation Sum</span>
                    <span className="font-semibold text-slate-200">{day.precip_sum} mm</span>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">Max Wind Gust</span>
                    <span className="font-semibold text-slate-200">{day.wind_speed_max} km/h</span>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-xl">
                    <span className="text-slate-400 block text-[10px]">UV Index Max</span>
                    <span className="font-semibold text-slate-200">{day.uv_max}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
