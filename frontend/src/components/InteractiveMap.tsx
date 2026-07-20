import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Layers, MapPin, Eye, Zap, Flame, Wind as WindIcon } from 'lucide-react';

interface InteractiveMapProps {
  lat: number;
  lon: number;
  locationName: string;
}

// Fix standard Leaflet icon paths
const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Helper component to recenter map when location changes
const ChangeMapView: React.FC<{ coords: [number, number] }> = ({ coords }) => {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ lat, lon, locationName }) => {
  const [layerType, setLayerType] = useState<'radar' | 'satellite' | 'temp' | 'clouds'>('radar');

  const getTileLayer = () => {
    switch (layerType) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'temp':
        return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-700/60 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-sky-400" />
          <div>
            <h3 className="text-lg font-bold text-slate-100">Interactive Weather Map</h3>
            <p className="text-xs text-slate-400">Live Doppler Rain Radar & Satellite Overlays</p>
          </div>
        </div>

        {/* Map Layer Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-700/80 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setLayerType('radar')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              layerType === 'radar' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" /> Rain Radar
          </button>
          <button
            onClick={() => setLayerType('satellite')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              layerType === 'satellite' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Satellite
          </button>
          <button
            onClick={() => setLayerType('temp')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              layerType === 'temp' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Topo & Temp
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-700/80 relative z-10">
        <MapContainer
          center={[lat, lon]}
          zoom={10}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <ChangeMapView coords={[lat, lon]} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url={getTileLayer()}
          />
          {layerType === 'radar' && (
            <TileLayer
              opacity={0.65}
              url="https://tilecache.rainviewer.com/v2/radar/nowcast_0/256/{z}/{x}/{y}/2/1_1.png"
            />
          )}
          <Marker position={[lat, lon]} icon={customIcon}>
            <Popup>
              <div className="text-slate-900 font-sans p-1">
                <strong className="text-sm">{locationName}</strong>
                <p className="text-xs text-slate-600">Lat: {lat.toFixed(2)}, Lon: {lon.toFixed(2)}</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};
