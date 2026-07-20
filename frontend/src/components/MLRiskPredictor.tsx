import React, { useEffect, useState } from 'react';
import { MLPrediction, WeatherData } from '../types/weather';
import { getMLPredictions } from '../services/api';
import { Cpu, AlertTriangle, ShieldCheck, Flame, CloudRain, Wind, TrendingUp } from 'lucide-react';

interface MLRiskPredictorProps {
  weatherData: WeatherData;
}

export const MLRiskPredictor: React.FC<MLRiskPredictorProps> = ({ weatherData }) => {
  const [prediction, setPrediction] = useState<MLPrediction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchML = async () => {
      setLoading(true);
      const { temp, humidity, pressure, wind_speed } = weatherData.current;
      const res = await getMLPredictions(temp, humidity, pressure, wind_speed);
      setPrediction(res);
      setLoading(false);
    };
    fetchML();
  }, [weatherData]);

  if (loading || !prediction) {
    return (
      <div className="glass-panel p-6 rounded-3xl border border-slate-700/60 animate-pulse text-center text-slate-400 text-sm">
        Running Scikit-Learn Ensemble Risk Models...
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-700/60 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-lg font-bold text-slate-100">AI & Machine Learning Risk Analytics</h3>
            <p className="text-xs text-slate-400">RandomForest & Ensemble Predictive Models ({prediction.model_version})</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[11px] font-medium">
          Automated Risk Score
        </span>
      </div>

      {/* ML AI Recommendation Banner */}
      <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 text-indigo-200 text-xs flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-400 flex-shrink-0" />
        <p className="font-medium">{prediction.recommendation}</p>
      </div>

      {/* Grid of Risk Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Rain Probability</span>
            <CloudRain className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-blue-300">{prediction.rain_probability}%</p>
          <p className="text-[10px] text-slate-400">24-Hour ML Model</p>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Storm Severity</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-amber-300">{prediction.storm_severity_index} <span className="text-xs font-normal">/ 100</span></p>
          <p className="text-[10px] text-slate-400">Convective Risk Index</p>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Heatwave Risk</span>
            <Flame className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-2xl font-bold text-red-300">{prediction.heatwave_risk}%</p>
          <p className="text-[10px] text-slate-400">Thermal Exertion Score</p>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Flood Risk</span>
            <Wind className="w-4 h-4 text-teal-400" />
          </div>
          <p className="text-xl font-bold text-teal-300">{prediction.flood_risk_level}</p>
          <p className="text-[10px] text-slate-400">Ground Saturation</p>
        </div>
      </div>
    </div>
  );
};
