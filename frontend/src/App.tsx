import React, { useState, useEffect } from 'react';
import { WeatherData } from './types/weather';
import { getWeatherData, downloadPDFReport } from './services/api';
import { Navbar } from './components/Navbar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { ForecastCharts } from './components/ForecastCharts';
import { DailyForecast } from './components/DailyForecast';
import { InteractiveMap } from './components/InteractiveMap';
import { AirQualityModule } from './components/AirQualityModule';
import { MLRiskPredictor } from './components/MLRiskPredictor';
import { NewsEmergencyModule } from './components/NewsEmergencyModule';
import { AIAssistant } from './components/AIAssistant';
import { UserDashboardModal } from './components/UserDashboardModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AuthModal } from './components/AuthModal';

export const App: React.FC = () => {
  const [lat, setLat] = useState<number>(40.7128); // Default New York
  const [lon, setLon] = useState<number>(-74.0060);
  const [locationName, setLocationName] = useState<string>('New York, US');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [isDark, setIsDark] = useState<boolean>(true);

  // Modals
  const [authOpen, setAuthOpen] = useState(false);
  const [userDashOpen, setUserDashOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    // Attempt automatic GPS location on launch
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(pos.coords.latitude);
          setLon(pos.coords.longitude);
          setLocationName('Your Current GPS Location');
        },
        () => {
          console.log('GPS permission denied, using default New York');
        }
      );
    }
  }, []);

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      const data = await getWeatherData(lat, lon, locationName);
      setWeatherData(data);
      setLoading(false);
    };
    loadWeather();
  }, [lat, lon, locationName]);

  const handleSelectLocation = (newLat: number, newLon: number, name: string) => {
    setLat(newLat);
    setLon(newLon);
    setLocationName(name);
  };

  const handleUseGPS = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(pos.coords.latitude);
          setLon(pos.coords.longitude);
          setLocationName('Your Current GPS Location');
        },
        () => alert('Unable to fetch GPS position.')
      );
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'} transition-colors duration-300 pb-16`}>
      <Navbar
        onSelectLocation={handleSelectLocation}
        onUseGPS={handleUseGPS}
        unit={unit}
        onToggleUnit={() => setUnit(unit === 'C' ? 'F' : 'C')}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenAuth={() => setAuthOpen(true)}
        onOpenUserDashboard={() => setUserDashOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onDownloadPDF={() => weatherData && downloadPDFReport(weatherData)}
      />

      <main className="max-w-7xl mx-auto px-4 pt-6 space-y-6">
        {loading || !weatherData ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-slate-400">Fetching live weather data & ML forecasts...</p>
          </div>
        ) : (
          <>
            {/* Hero Current Weather Card */}
            <CurrentWeatherCard data={weatherData} unit={unit} />

            {/* Scikit-Learn ML Risk Predictor */}
            <MLRiskPredictor weatherData={weatherData} />

            {/* 48-Hour Hourly Interactive Charts */}
            <ForecastCharts hourly={weatherData.hourly} unit={unit} />

            {/* Interactive Leaflet Weather Radar Map & Air Quality */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <InteractiveMap lat={lat} lon={lon} locationName={locationName} />
              </div>
              <div className="lg:col-span-5">
                <AirQualityModule airQuality={weatherData.air_quality} />
              </div>
            </div>

            {/* 10-Day Forecast & Disaster News Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <DailyForecast daily={weatherData.daily} unit={unit} />
              </div>
              <div className="lg:col-span-5">
                <NewsEmergencyModule />
              </div>
            </div>

            {/* Floating Voice AI Assistant */}
            <AIAssistant weatherData={weatherData} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 pt-12 text-center text-xs text-slate-500 border-t border-slate-800/80 mt-12">
        <p>© 2026 Aura AI Weather Engine. Powered by FastAPI, React, Leaflet, Chart.js, and Scikit-Learn.</p>
      </footer>

      {/* Modals */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <UserDashboardModal isOpen={userDashOpen} onClose={() => setUserDashOpen(false)} onSelectCity={handleSelectLocation} />
      <AdminPanelModal isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
};
