import { Button, FormControlLabel, Grid, Switch, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import FormInput from './text-field.jsx';
import Map from './map.jsx';
import AutocompleteComponent from './autocomplete.jsx';
import { zonedTimeToUtc } from 'date-fns-tz';

const useStyles = makeStyles(theme => ({
  switch: {
    height: '3.5rem'
  },

  height: {
    height: '25rem'
  },

  height2: {
    height: '20rem'
  }
}));

export default function EventForm() {
  const [values, setValues] = useState(
    {
      title: '',
      description: '',
      time: '',
      date: '',
      on: false,
      email: '',
      origin: '',
      destination: '',
      originCoords: null,
      destinationCoords: null
    });
  const [center, setCenter] = useState(
    {
      lat: 0,
      lng: 0
    }
  );
  const [marker, setMarker] = useState(null);
  const [error, setError] = useState(false);
  const classes = useStyles();

  const handleMapLoad = () => {
    setCenter(
      {
        lat: 33.63512489483346,
        lng: -117.74047007255454
      }
    );
  };

  const handlePlaceChanged = (target, autocomplete) => {
    if (autocomplete !== null) {
      const newCenter = { ...center };
      newCenter.lat = autocomplete.getPlace().geometry.location.lat();
      newCenter.lng = autocomplete.getPlace().geometry.location.lng();
      if (target === 'destination') {
        setCenter(newCenter);
        setMarker(newCenter);
        setValues({ ...values, destinationCoords: newCenter });
        setValues({ ...values, destination: autocomplete.getPlace().formatted_address });
      }
      if (target === 'origin') {
        setValues({ ...values, originCoords: newCenter });
        setValues({ ...values, origin: autocomplete.getPlace().formatted_address });
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { title, description, time, date, on, email, origin, destination, originCoords, destinationCoords } = values;
    if (title && description && time && date && destination) {
      const coords = { originCoords, destinationCoords };
      const zonedDate = `${date} ${time}:00`;
      const timestamp = zonedTimeToUtc(zonedDate, Intl.DateTimeFormat().resolvedOptions().timeZone);
      const init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, timestamp, origin, destination, coords, email, notification: on })
      };
      fetch('/api/events', init)
        .then(() => {
          setValues({
            title: '',
            description: '',
            time: '',
            date: '',
            on: false,
            email: '',
            origin: '',
            destination: '',
            originCoords: null,
            destinationCoords: null
          });
          setCenter({
            lat: 33.63512489483346,
            lng: -117.74047007255454
          });
          setMarker(null);
          setError(false);
        })
        .catch(err => console.error(err));
    } else setError(true);

  };

  const handleChange = e => {
    setValues({ ...values, [e.target.getAttribute('id')]: e.target.value });
    if (e.target.value === '') {
      setMarker(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Grid container spacing={2} justifyContent='center'>
        {error &&
          <Typography style={{ color: '#DB5461' }}>Required inputs missing! Try again.</Typography>}
        <Grid item xs={12} sm={6} container spacing={3}>
            <FormInput handleChange={handleChange} id="title" value={values.title}/>
            <FormInput handleChange={handleChange} id="description" value={values.description}/>
            <FormInput handleChange={handleChange} id="date" value={values.date} />
          <FormInput handleChange={handleChange} id="time" value={values.time} />
          <AutocompleteComponent handlePlaceChanged={handlePlaceChanged} handleChange={handleChange} id="origin" value={values.origin} />
          <AutocompleteComponent handlePlaceChanged={handlePlaceChanged} handleChange={handleChange} id="destination" value={values.destination} />
        </Grid>
        <Grid item container alignContent="space-between" spacing={3} xs={12} sm={6}>
          <Grid item xs={12} className={values.on ? classes.height2 : classes.height}>
            <Map marker={marker} center={center} handleLoad={handleMapLoad}/>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel className={classes.switch}
              control={<Switch checked={values.on} onChange={() => setValues({ ...values, on: !values.on })} />}
              label="Normal"
              labelPlacement="start"
            />
          </Grid>
          {values.on &&
            <Grid item xs={12}>
            <FormInput handleChange={handleChange} id="email" value={values.email} />
            </Grid>}
        </Grid>
      <Grid item xs={12} container justifyContent='center'>
        <Grid item>
          <Button type='submit' variant="contained" color="primary">
            SUBMIT
          </Button>
        </Grid>
      </Grid>
      </Grid>
    </form>
  );
}
