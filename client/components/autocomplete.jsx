import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';

export default function AutcompleteComponent(props) {
  const [autocomplete, setAutocomplete] = useState(null);

  const autoLoad = auto => {
    setAutocomplete(auto);
  };

  return (
    <Autocomplete
      onLoad={autoLoad}
      onPlaceChanged={() => props.handlePlaceChanged(props.dataName, autocomplete)}
    >
      {/* <AutocompleteInput dataName={props.dataName} geolocation={props.geolocation} inputValue={props.inputValue} setInputValue={props.setInputValue} /> */}
    </Autocomplete>
  );
}
