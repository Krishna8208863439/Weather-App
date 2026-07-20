import React, { useState } from 'react';
import { User, Star, Settings, Bell, Bookmark, X, Check } from 'lucide-react';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (lat: number, lon: number, name: string) => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({ isOpen, onClose, onSelectCity }) => {
  const [favorites, setFavorites] = useState([
    { name: "New York, US", latitude: 40.7128, longitude: -74.0060 },
    { name: "London, UK", latitude: 51.5074, longitude: -0.1278 },
    { name: "Tokyo, JP", latitude: 35.6762, longitude: 139.6503 },
    { name: "Sydney, AU", latitude: -33.8688, longitude: 151.2093 }
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl glass-panel border border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
          <div className="flex items-center gap-2.5">
            <User className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-slate-100">User Profile & Favorites Dashboard</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Favorite Locations Sync */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
            <Bookmark className="w-4 h-4 text-amber-400" /> Saved Favorite Cities (Synced)
          </h4>
          <div className="grid grid-cols-2 gap-2.5">
            {favorites.map((fav, i) => (
              <div
                key={i}
                onClick={() => {
                  onSelectCity(fav.latitude, fav.longitude, fav.name);
                  onClose();
                }}
                className="p-3 bg-slate-900/60 rounded-2xl border border-slate-800 hover:border-blue-500/50 cursor-pointer flex items-center justify-between transition"
              >
                <span className="text-xs font-semibold text-slate-200">{fav.name}</span>
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
          <h4 className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-slate-400" /> Notification & Synchronization Settings
          </h4>
          <div className="space-y-2 text-slate-300">
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/40 border border-slate-800 cursor-pointer">
              <span>Push Notifications for Severe Weather Alerts</span>
              <input type="checkbox" defaultChecked className="accent-blue-500 rounded" />
            </label>
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/40 border border-slate-800 cursor-pointer">
              <span>Daily AI Morning Briefing Email</span>
              <input type="checkbox" defaultChecked className="accent-blue-500 rounded" />
            </label>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-lg hover:bg-blue-500 transition"
        >
          Save & Close Settings
        </button>
      </div>
    </div>
  );
};
