import React, { useState, useEffect } from 'react';
import { Search, Navigation, Sun, Moon, User, ShieldAlert, FileText, Activity } from 'lucide-react';
import { searchLocations } from '../services/api';

interface NavbarProps {
  onSelectLocation: (lat: number, lon: number, name: string) => void;
  onUseGPS: () => void;
  unit: 'C' | 'F';
  onToggleUnit: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenAuth: () => void;
  onOpenUserDashboard: () => void;
  onOpenAdmin: () => void;
  onDownloadPDF: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectLocation,
  onUseGPS,
  unit,
  onToggleUnit,
  isDark,
  onToggleTheme,
  onOpenAuth,
  onOpenUserDashboard,
  onOpenAdmin,
  onDownloadPDF
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const res = await searchLocations(query);
      setSuggestions(res);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (item: any) => {
    const displayName = `${item.name}${item.admin1 ? ', ' + item.admin1 : ''} (${item.country_code || item.country || ''})`;
    onSelectLocation(item.latitude, item.longitude, displayName);
    setQuery('');
    setSuggestions([]);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-700/50 backdrop-blur-md px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onUseGPS()}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/30">
              🌤️
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-200 bg-clip-text text-transparent">
                AURA WEATHER AI
              </h1>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                Next-Gen ML Forecasting
              </p>
            </div>
          </div>

          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-800/80 text-amber-400 border border-slate-700"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Search Bar & Auto-Suggest */}
        <div className="relative w-full md:max-w-md">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search City, Zip Code, State, Country..."
              className="w-full pl-9 pr-12 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
            <button
              onClick={onUseGPS}
              title="Use My GPS Location"
              className="absolute right-2 p-1.5 rounded-lg bg-blue-600/30 text-blue-400 hover:bg-blue-600 hover:text-white transition"
            >
              <Navigation className="w-4 h-4" />
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800/60 max-h-64 overflow-y-auto">
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-2.5 text-sm text-slate-200 hover:bg-blue-600/30 hover:text-white cursor-pointer flex justify-between items-center transition"
                >
                  <span className="font-medium">{item.name}</span>
                  <span className="text-xs text-slate-400">
                    {item.admin1 ? `${item.admin1}, ` : ''}{item.country || ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto justify-center md:justify-end">
          {/* C/F Unit Toggle */}
          <button
            onClick={onToggleUnit}
            className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-blue-300 hover:bg-blue-600/20 transition flex items-center gap-1"
          >
            °{unit} Switch
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-amber-400 hover:bg-amber-400/20 transition hidden md:flex"
            title="Toggle Dark/Light Mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* PDF Report Download */}
          <button
            onClick={onDownloadPDF}
            className="px-3 py-1.5 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-xs font-semibold text-indigo-200 hover:bg-indigo-600 hover:text-white transition flex items-center gap-1.5"
            title="Download PDF Report"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF Report</span>
          </button>

          {/* User Dashboard */}
          <button
            onClick={onOpenUserDashboard}
            className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          {/* Admin Panel */}
          <button
            onClick={onOpenAdmin}
            className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition flex items-center gap-1.5"
            title="Admin Monitoring Panel"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* Auth Modal Trigger */}
          <button
            onClick={onOpenAuth}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-md shadow-blue-500/20 hover:brightness-110 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};
