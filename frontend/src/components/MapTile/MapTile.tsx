import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import { MapTileProps } from '../../types.ts/index.js';

import 'leaflet/dist/leaflet.css';
import styles from './MapTile.module.scss';

const MapTile = ({ lat, lng, warehouseLocation }: MapTileProps) => {
  const markerIcon = new L.Icon({
    /* eslint-disable-next-line global-require */
    iconUrl: require('../../assets/map-marker.png'),
    iconSize: [35, 35],
  });
  return (
    <MapContainer
      className={styles.mapTileContainer}
      center={[Number(lat), Number(lng)]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[Number(lat), Number(lng)]} icon={markerIcon}>
        <Popup>
          <b>Warehouse location:</b> <br /> {warehouseLocation}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapTile;
