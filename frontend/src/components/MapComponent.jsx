import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue in webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent = ({ latitude, longitude, locationName }) => {
  if (!latitude || !longitude) {
    return (
      <div className="w-full aspect-video rounded-xl bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-5xl text-primary mb-2 block">place</span>
          <p className="text-[#10221b]/80 dark:text-background-light/80">Location coordinates not available</p>
        </div>
      </div>
    );
  }

  const position = [latitude, longitude];

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {locationName}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
