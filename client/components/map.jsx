import React from 'react';
import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

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
          minHeight: '17rem'
        }}
        center={props.center}
        zoom={17}
      >
        {
          (props.marker && !props.dirRes) &&
          <Marker position={props.marker} />
        }
        {(
          props.dirOptions.destination !== null &&
          props.dirOptions.origin !== null && props.dirOptions.origin !== ''
        ) && (
        <DirectionsService
          options={props.dirOptions}
          callback={props.directionsCallback}
        />
        )}
        {props.dirRes !== null &&
          <DirectionsRenderer
            options={{
              directions: props.dirRes
            }}/>}
      </GoogleMap>
    </LoadScript>
  );
}
