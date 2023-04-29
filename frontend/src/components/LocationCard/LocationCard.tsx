import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LocationProps } from '../../types.ts/index.js';
import MapTile from '../MapTile/MapTile';
import './LocationCard.scss';

const LocationCard = ({ deliveryData }: LocationProps) => {
  const { warehouseAddressLat, warehouseAddressLng, warehouseAddress } = deliveryData;
  const country = warehouseAddress.split(',').reverse()[0].toUpperCase();
  const addressArray = warehouseAddress.split(',');
  const address = addressArray.slice(0, addressArray.length - 1).join(',');
  return (
    <Card className="location-card">
      <div className="map-tile">
        <MapTile lat={warehouseAddressLat} lng={warehouseAddressLng} warehouseLocation={address} />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {country}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LocationCard;