import { Button, FormControlLabel, Grid, Switch, Typography } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import FormInput from './text-field.jsx';
import Map from './map.jsx';
import AutocompleteComponent from './autocomplete.jsx';
import { zonedTimeToUtc } from 'date-fns-tz';
import { UserContext } from '../app.jsx';

export default function EventForm(props) {
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
  const [dirOptions, setDirOptions] = useState(
    {
      destination: null,
      origin: null,
      travelMode: 'DRIVING'
    }
  );
  const [dirRes, setDirRes] = useState(null);
  const contextValues = useContext(UserContext);
  const { classes } = contextValues;

  useEffect(() => {
    if (props.editValues) {
      setValues({ ...props.editValues });
      setMarker(props.editValues.destinationCoords);
      setDirOptions({ ...dirOptions, destination: props.editValues.destination, origin: props.editValues.origin });
    }
    contextValues.loading(false);
    return () => {
      setValues(null);
      setMarker(null);
      setDirOptions(null);
    };
  }, []);

  const handleMapLoad = () => {
    setCenter(props.editValues
      ? props.editValues.destinationCoords
      : {
          lat: 0,
          lng: 0
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
        setValues({ ...values, destinationCoords: newCenter, destination: autocomplete.getPlace().formatted_address });
        setDirOptions({ ...dirOptions, destination: autocomplete.getPlace().formatted_address });
      }
      if (target === 'origin') {
        setValues({ ...values, originCoords: newCenter, origin: autocomplete.getPlace().formatted_address });
        setDirOptions({ ...dirOptions, origin: autocomplete.getPlace().formatted_address });
      }
    }
  };

  const directionsCallback = useCallback(res => {
    if (res !== null) {
      if (res.status === 'OK') {
        setDirRes(res);
      }
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    let { title, description, time, date, on, email, origin, destination, originCoords, destinationCoords } = values;
    if (title && description && time && date && destination) {
      const coords = { originCoords, destinationCoords };
      if (origin === '') coords.originCoords = null;
      if (on === false) email = '';
      const zonedDate = `${date} ${time}:00`;
      const timestamp = zonedTimeToUtc(zonedDate, Intl.DateTimeFormat().resolvedOptions().timeZone);
      let method = 'POST';
      let fetchLink = '/api/events';
      const body = { title, description, timestamp, origin, destination, coords, email, notification: on };
      if (props.editValues) {
        method = 'PATCH';
        fetchLink = `/api/events/${props.editValues.eventId}`;
      }
      const init = {
        method,
        headers: {
          authorization: contextValues.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      };
      fetch(fetchLink, init)
        .then(() => {
          if (props.editValues) {
            window.location.hash = `#events?eventId=${props.editValues.eventId}`;
          } else {
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
              lat: 0,
              lng: 0
            });
            setMarker(null);
            setError(false);
            setDirOptions({
              destination: null,
              origin: null,
              travelMode: 'DRIVING'
            });
            setDirRes(null);
          }
        })
        .catch(err => console.error(err));
    } else setError(true);
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.getAttribute('id')]: e.target.value });
    if (e.target.value === '' && e.target.getAttribute('id') === 'destination') {
      setMarker(null);
    }
  };

  if (contextValues.isLoading) {
    return (
      <Grid container justifyContent="center">
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </Grid>
    );
  }
  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Grid container spacing={2} justifyContent='center'>
        {error &&
          <Grid item xs={12}>
            <Typography align='center' style={{ color: '#DB5461' }}>Required inputs missing! Try again.</Typography>
          </Grid>}
        <Grid item xs={12} sm={6} container spacing={3}>
            <FormInput handleChange={handleChange} id="title" value={values.title}/>
            <FormInput handleChange={handleChange} id="description" value={values.description}/>
            <FormInput handleChange={handleChange} id="date" value={values.date} />
          <FormInput handleChange={handleChange} id="time" value={values.time} />
          <AutocompleteComponent handlePlaceChanged={handlePlaceChanged} handleChange={handleChange} id="origin" value={values.origin} />
          <AutocompleteComponent handlePlaceChanged={handlePlaceChanged} handleChange={handleChange} id="destination" value={values.destination} />
        </Grid>
        <Grid item container alignContent="space-between" spacing={3} xs={12} sm={6}>
          <Grid item xs={12} className={values.on ? classes.height20 : classes.height25}>
            <Map marker={marker} center={center} handleLoad={handleMapLoad} dirOptions={dirOptions} dirRes={dirRes} directionsCallback={directionsCallback}/>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel className={classes.switch}
              control={<Switch checked={values.on} onChange={() => setValues({ ...values, on: !values.on })} />}
              label="Email Notification"
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
