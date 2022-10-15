import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapTile from './MapTile';

import './styles.scss';

const LocationCard = () => {
  return (
    <Card className='location-card'>
      <div className='map-tile'>
        <MapTile />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Poland
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Some Address
        </Typography>
      </CardContent>
    </Card>
  );
}

export default LocationCard;
