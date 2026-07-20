import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { HourlyForecast } from '../types/weather';
import { Line as LineChart, Bar as BarChart } from 'react-chartjs-2';
import { Thermometer, Wind, CloudRain, Droplets } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ForecastChartsProps {
  hourly: HourlyForecast[];
  unit: 'C' | 'F';
}

export const ForecastCharts: React.FC<ForecastChartsProps> = ({ hourly, unit }) => {
  const [activeTab, setActiveTab] = useState<'temp' | 'rain' | 'wind' | 'humidity'>('temp');

  const labels = hourly.slice(0, 24).map((h) => {
    const parts = h.time.split('T');
    return parts[1] ? parts[1].slice(0, 5) : h.time;
  });

  const getTempData = () => {
    return hourly.slice(0, 24).map((h) => unit === 'F' ? Math.round((h.temp * 9/5) + 32) : h.temp);
  };

  const chartDataMap = {
    temp: {
      labels,
      datasets: [
        {
          label: `Temperature (°${unit})`,
          data: getTempData(),
          borderColor: '#38BDF8',
          backgroundColor: 'rgba(56, 189, 248, 0.15)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
        }
      ]
    },
    rain: {
      labels,
      datasets: [
        {
          label: 'Rain Probability (%)',
          data: hourly.slice(0, 24).map((h) => h.precip_prob),
          backgroundColor: 'rgba(99, 102, 241, 0.7)',
          borderRadius: 6,
        }
      ]
    },
    wind: {
      labels,
      datasets: [
        {
          label: 'Wind Speed (km/h)',
          data: hourly.slice(0, 24).map((h) => h.wind_speed),
          borderColor: '#06B6D4',
          backgroundColor: 'rgba(6, 182, 212, 0.15)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
        }
      ]
    },
    humidity: {
      labels,
      datasets: [
        {
          label: 'Relative Humidity (%)',
          data: hourly.slice(0, 24).map((h) => h.humidity),
          borderColor: '#818CF8',
          backgroundColor: 'rgba(129, 140, 248, 0.15)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
        }
      ]
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F172A',
        titleColor: '#F8FAFC',
        bodyColor: '#38BDF8',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 10
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94A3B8', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.08)' },
        ticks: { color: '#94A3B8', font: { size: 11 } }
      }
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-700/60 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100">48-Hour Hourly Interactive Charts</h3>
          <p className="text-xs text-slate-400">Detailed atmospheric trend line analytics</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-700/80">
          <button
            onClick={() => setActiveTab('temp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              activeTab === 'temp' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" /> Temp
          </button>
          <button
            onClick={() => setActiveTab('rain')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              activeTab === 'rain' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" /> Rain
          </button>
          <button
            onClick={() => setActiveTab('wind')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              activeTab === 'wind' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wind className="w-3.5 h-3.5" /> Wind
          </button>
          <button
            onClick={() => setActiveTab('humidity')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              activeTab === 'humidity' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" /> Humidity
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-64 sm:h-72 pt-2">
        {activeTab === 'rain' ? (
          <BarChart data={chartDataMap.rain} options={options} />
        ) : (
          <LineChart data={chartDataMap[activeTab]} options={options} />
        )}
      </div>
    </div>
  );
};
