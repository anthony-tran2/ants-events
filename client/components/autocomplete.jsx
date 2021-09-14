import React, { useState } from 'react';
import { Autocomplete, LoadScript } from '@react-google-maps/api';
import FormInput from './text-field';
import { Grid } from '@material-ui/core';

const libraries = ['places'];
const mapsAPIKey = process.env.MAPS_API_KEY;

export default function AutocompleteComponent(props) {
  const [autocomplete, setAutocomplete] = useState(null);

  const autoLoad = auto => {
    setAutocomplete(auto);
  };

  return (
    <Grid item xs={12}>
    <LoadScript
      googleMapsApiKey={mapsAPIKey}
      libraries={libraries}
    >
    <Autocomplete
      onLoad={autoLoad}
      onPlaceChanged={() => props.handlePlaceChanged(props.id, autocomplete)}
    >
          <FormInput initial={props.initial} setInitial={props.setInitial} id={props.id} anError={props.anError} handleChange={props.handleChange} value={props.value} />
    </Autocomplete>
    </LoadScript>
    </Grid>
  );
}
