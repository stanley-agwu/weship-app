import React from 'react';
import Map, {Marker} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MAPBOX_ACCESS_TOKEN: string;
    }
  }
}

const MapTile = () => {
  const [viewState, setViewState] = React.useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14
  });

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      <Marker longitude={-122.4} latitude={37.8} color="red" />
    </Map>
  );
}

export default MapTile;