
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
// @ts-ignore
import L from 'leaflet';

// Fix for default marker icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Map: React.FC = () => {
  const position: [number, number] = [6.2447, -75.5878]; // Coordinates for Medellín
  
  return (
    
    <section className="map-section">
        <div className="map-container">
          
        < MapContainer{...({ center: position, zoom: 15, style: { height: '100%', width: '100%' } } as any)}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // @ts-ignore
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
            <Popup>
                Av. 33 #64 – 198, Laureles - Estadio, Medellín, Antioquia
            </Popup>
            </Marker>
        </MapContainer>
        </div>
    </section>
  );
};

export default Map;
