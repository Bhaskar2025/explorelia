// frontend/src/components/MapRoutePlanner/MapRoutePlanner.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { calculateRoute } from '../../services/api';
import 'leaflet/dist/leaflet.css';
import './MapRoutePlanner.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapRoutePlannerProps {
  className?: string;
}

const MapRoutePlanner: React.FC<MapRoutePlannerProps> = ({ className = '' }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [preference, setPreference] = useState('fastest');
  const [routeData, setRouteData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSensors, setShowSensors] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);

  const jaipurCenter: [number, number] = [26.9124, 75.7873];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!origin || !destination) {
      setError('Please enter both origin and destination');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await calculateRoute(origin, destination, preference);
      setRouteData(data);
    } catch (err) {
      setError('Failed to calculate route');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Mock sensor data
  const sensorLocations: [number, number][] = [
    [26.922, 75.821], [26.905, 75.801], [26.895, 75.815],
    [26.912, 75.787], [26.925, 75.795], [26.935, 75.825]
  ];

  // Mock heatmap data (simplified)
  const heatmapData: [number, number, number][] = [
    [26.922, 75.821, 0.8], // High density
    [26.905, 75.801, 0.6], // Medium density
    [26.895, 75.815, 0.4], // Low density
    [26.912, 75.787, 0.7], // Medium-high density
    [26.925, 75.795, 0.3], // Low density
    [26.935, 75.825, 0.9]  // Very high density
  ];

  return (
    <div className={`map-route-planner ${className}`}>
      <h2>Interactive Map & Route Planner</h2>
      
      <div className="map-container">
        <MapContainer 
          center={jaipurCenter} 
          zoom={13} 
          className="map"
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {showSensors && sensorLocations.map((position, index) => (
            <Marker key={index} position={position}>
              <Popup>
                AQI Sensor #{index + 1} <br /> Air Quality: Moderate
              </Popup>
            </Marker>
          ))}
          
          {routeData && routeData.polyline && (
            <Polyline 
              positions={routeData.polyline} 
              color={preference === 'eco_friendly' ? 'green' : 'blue'}
              weight={4}
              opacity={0.7}
            />
          )}
        </MapContainer>
        
        <div className="map-controls">
          <form onSubmit={handleSubmit} className="route-form">
            <div className="form-group">
              <label htmlFor="origin">Origin</label>
              <input
                type="text"
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Starting point"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination"
              />
            </div>
            
            <div className="form-group">
              <label>Route Preference</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    value="fastest"
                    checked={preference === 'fastest'}
                    onChange={() => setPreference('fastest')}
                  />
                  <span>Fastest Route</span>
                </label>
                
                <label className="radio-option">
                  <input
                    type="radio"
                    value="eco_friendly"
                    checked={preference === 'eco_friendly'}
                    onChange={() => setPreference('eco_friendly')}
                  />
                  <span>Eco-Friendly Route</span>
                </label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="calculate-route-btn"
              disabled={loading}
            >
              {loading ? 'Calculating...' : 'Calculate Route'}
            </button>
            
            {error && <div className="error-message">{error}</div>}
            
            {routeData && (
              <div className="route-info">
                <h4>Route Information</h4>
                <p>Distance: {(routeData.total_distance / 1000).toFixed(1)} km</p>
                <p>Time: {Math.round(routeData.total_time / 60)} minutes</p>
                <p>AQI Exposure: {routeData.aqi_exposure.toFixed(1)}</p>
              </div>
            )}
          </form>
          
          <div className="layer-controls">
            <h4>Map Layers</h4>
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={showSensors}
                onChange={() => setShowSensors(!showSensors)}
              />
              <span>Show AQI Sensors</span>
            </label>
            
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={showHeatmap}
                onChange={() => setShowHeatmap(!showHeatmap)}
              />
              <span>Show Heatmap</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapRoutePlanner;