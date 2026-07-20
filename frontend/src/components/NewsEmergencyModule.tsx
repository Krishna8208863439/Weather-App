import React, { useState } from 'react';
import { Newspaper, ShieldAlert, PhoneCall, Home, AlertCircle, ExternalLink } from 'lucide-react';

export const NewsEmergencyModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'emergency'>('news');

  const newsItems = [
    {
      id: 1,
      title: "Severe Weather System Approaching East Coast with 120km/h Winds",
      category: "Cyclone News",
      time: "2 Hours Ago",
      source: "Global Meteorological Bureau",
      summary: "Coastal authorities issue flash flood and storm surge warnings across coastal jurisdictions as typhoon strengthens.",
      severity: "High"
    },
    {
      id: 2,
      title: "Record High Heat Index Forecast Across Central Plains",
      category: "Heatwave Alert",
      time: "4 Hours Ago",
      source: "National Climate Center",
      summary: "Temperatures projected to cross 42°C for the 5th consecutive day. Electric grid operators urge energy conservation.",
      severity: "Warning"
    },
    {
      id: 3,
      title: "AI Meteorological Models Achieve 94% Accuracy in Rainfall Predictions",
      category: "AI Innovation",
      time: "1 Day Ago",
      source: "Journal of Atmospheric AI",
      summary: "Recent benchmark tests confirm deep learning LSTM networks achieve high precision in short-term convective rain modeling.",
      severity: "Info"
    }
  ];

  const emergencyContacts = [
    { name: "National Helpline", phone: "911 / 112" },
    { name: "Disaster Response Force", phone: "1-800-DISASTER" },
    { name: "Coast Guard Rescue", phone: "1-800-555-COAST" },
    { name: "Medical & Ambulance", phone: "108 / 911" }
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-700/60 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
        <div className="flex items-center gap-2">
          {activeTab === 'news' ? (
            <Newspaper className="w-5 h-5 text-amber-400" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-red-400" />
          )}
          <h3 className="text-lg font-bold text-slate-100">
            {activeTab === 'news' ? 'Weather News & Disaster Feed' : 'Emergency Module & Safety Hub'}
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-700/80">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              activeTab === 'news' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            News Feed
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              activeTab === 'emergency' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Emergency Hub
          </button>
        </div>
      </div>

      {activeTab === 'news' ? (
        <div className="space-y-3">
          {newsItems.map((item) => (
            <div key={item.id} className="glass-card p-4 rounded-2xl space-y-1.5 hover:bg-slate-800/60 transition">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-semibold border border-amber-400/30">
                  {item.category}
                </span>
                <span className="text-slate-400">{item.time} • {item.source}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
              <p className="text-xs text-slate-300">{item.summary}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {emergencyContacts.map((c, i) => (
              <div key={i} className="bg-red-950/40 p-3.5 rounded-2xl border border-red-500/30 text-center space-y-1">
                <PhoneCall className="w-5 h-5 text-red-400 mx-auto" />
                <p className="text-xs font-semibold text-slate-200">{c.name}</p>
                <p className="text-sm font-extrabold text-red-300">{c.phone}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
            <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
              <Home className="w-4 h-4 text-blue-400" /> Nearest Designated Disaster Shelter
            </h4>
            <p className="text-slate-300">Central Municipal Emergency Shelter • 450 Civil Center Plaza (2.4 km away)</p>
            <p className="text-emerald-400 font-semibold">Status: Open • Capacity: 120 Beds Available</p>
          </div>
        </div>
      )}
    </div>
  );
};
