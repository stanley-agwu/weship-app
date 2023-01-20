import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import { MapTileProps } from '../types.ts';
import './styles.scss';
import 'leaflet/dist/leaflet.css';

const MapTile = ({ lat, lng }: MapTileProps) => {
  const coordinates = [Number(lat), Number(lng)];
  const markerIcon = new L.Icon({
    iconUrl: require('../assets/map-marker.png'),
    iconSize: [35, 35],
  });
  return (
    <MapContainer
      className="map-tile-container"
      center={coordinates}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates} icon={markerIcon}>
        <Popup>
          Warehouse location <br /> For Delivery.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapTile;
