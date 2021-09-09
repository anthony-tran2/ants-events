import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const mapsAPIKey = process.env.MAPS_API_KEY;

export default function Map(props) {

  return (
    <LoadScript
      googleMapsApiKey={mapsAPIKey}
      libraries={libraries}
    >
      <GoogleMap
        onLoad={props.handleLoad}
        mapContainerStyle={{
          width: '100%',
          height: '100%',
          minHeight: '20rem'
        }}
        center={props.center}
        zoom={17}
      >
      </GoogleMap>
    </LoadScript>
  );
}
