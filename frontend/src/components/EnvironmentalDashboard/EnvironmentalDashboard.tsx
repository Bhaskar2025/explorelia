import React, { useState, useEffect } from 'react';
import { getEnvironmentalData } from '../../services/api';
import type { EnvironmentalData } from '../../services/api';
import './EnvironmentalDashboard.css';

interface EnvironmentalDashboardProps {
  location?: string;
}

const EnvironmentalDashboard: React.FC<EnvironmentalDashboardProps> = ({ location = 'jaipur' }) => {
  const [data, setData] = useState<EnvironmentalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getEnvironmentalData(location);
        setData(result);
      } catch (err) {
        setError('Failed to load environmental data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return '#4caf50'; // Good
    if (aqi <= 100) return '#ffeb3b'; // Moderate
    if (aqi <= 150) return '#ff9800'; // Unhealthy for sensitive groups
    if (aqi <= 200) return '#f44336'; // Unhealthy
    if (aqi <= 300) return '#9c27b0'; // Very unhealthy
    return '#673ab7'; // Hazardous
  };

  const getAqiDescription = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  if (loading) {
    return (
      <div className="environmental-dashboard">
        <h2>Environmental Intelligence</h2>
        <div className="dashboard-content skeleton">
          <div className="skeleton-circle"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="environmental-dashboard">
        <h2>Environmental Intelligence</h2>
        <div className="error-message">{error || 'No data available'}</div>
      </div>
    );
  }

  return (
    <div className="environmental-dashboard">
      <h2>Environmental Intelligence</h2>
      <div className="dashboard-content">
        <div className="aqi-gauge">
          <div className="gauge-container">
            <div 
              className="gauge-fill"
              style={{
                background: `conic-gradient(${getAqiColor(data.current_aqi)} 0deg, ${getAqiColor(data.current_aqi)} ${(data.current_aqi / 300) * 180}deg, #e0e0e0 ${(data.current_aqi / 300) * 180}deg, #e0e0e0 180deg)`
              }}
            ></div>
            <div className="gauge-center">
              <span className="aqi-value">{data.current_aqi}</span>
              <span className="aqi-label">AQI</span>
            </div>
          </div>
          <div className="aqi-description">
            {getAqiDescription(data.current_aqi)}
          </div>
        </div>

        <div className="weather-info">
          <div className="weather-icon">
            {data.weather_condition.includes('Cloud') ? '☁️' : 
             data.weather_condition.includes('Rain') ? '🌧️' : 
             data.weather_condition.includes('Sun') ? '☀️' : '🌤️'}
          </div>
          <div className="temperature">
            {data.current_temperature}°C
          </div>
          <div className="weather-details">
            <div>Humidity: {data.humidity}%</div>
            <div>Wind: {data.wind_speed} km/h</div>
          </div>
        </div>

        <div className="heatmap-section">
          <h3>Crowd Density Heatmap</h3>
          <img src={data.heatmap_image} alt="Crowd density heatmap" className="heatmap-image" />
        </div>

        <div className="aqi-trend">
          <h3>24-hour AQI Trend</h3>
          <div className="trend-chart">
            {Object.entries(data.aqi_trend).map(([key, value]) => (
              <div key={key} className="trend-bar-container">
                <div 
                  className="trend-bar"
                  style={{
                    height: `${(value.aqi / 300) * 100}%`,
                    backgroundColor: getAqiColor(value.aqi)
                  }}
                  aria-label={`AQI at ${new Date(value.timestamp).getHours()}:00 is ${value.aqi}`}
                ></div>
                <span className="trend-label">
                  {new Date(value.timestamp).getHours()}:00
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalDashboard;