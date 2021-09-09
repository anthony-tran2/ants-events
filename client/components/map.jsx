import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const mapsAPIKey = process.env.MAPS_API_KEY;

export default function Map(props) {

  const [center, setCenter] = useState(
    {
      lat: 0,
      lng: 0
    }
  );

  const handleLoad = () => {
    setCenter(
      {
        lat: 33.63512489483346,
        lng: -117.74047007255454
      }
    );
  };

  return (
    <LoadScript
      googleMapsApiKey={mapsAPIKey}
      libraries={libraries}
    >
      <GoogleMap
        onLoad={handleLoad}
        mapContainerStyle={{
          width: '100%',
          height: '100%',
          minHeight: '20rem'
        }}
        center={center}
        zoom={17}
      >
      </GoogleMap>
    </LoadScript>
  );
}
