import { Button, FormControlLabel, Grid, Switch, makeStyles } from '@material-ui/core';
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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [on, setOn] = useState(false);
  const [email, setEmail] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [destinationError, setDestinationError] = useState(false);
  const [center, setCenter] = useState(
    {
      lat: 0,
      lng: 0
    }
  );
  const [marker, setMarker] = useState(null);
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
        setDestinationCoords(newCenter);
        setDestination(autocomplete.getPlace().formatted_address);
      }
      if (target === 'origin') {
        setOrigin(autocomplete.getPlace().formatted_address);
        setOriginCoords(newCenter);
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (title === '') {
      setTitleError(true);
    }
    if (description === '') {
      setDescriptionError(true);
    }
    if (time === '') {
      setTimeError(true);
    }
    if (date === '') {
      setDateError(true);
    }
    if (destination === '') {
      setDestinationError(true);
    }
    if (on && email === '') {
      setEmailError(true);
    }
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
          setTitle('');
          setDescription('');
          setTime('');
          setDate('');
          setEmail('');
          setOrigin('');
          setDestination('');
          setOriginCoords(null);
          setDestinationCoords(null);
          setTitleError(false);
          setEmailError(false);
          setOn(false);
          setDescriptionError(false);
          setTimeError(false);
          setDateError(false);
          setDestinationError(false);
        })
        .catch(err => console.error(err));
    }

  };

  const handleChange = e => {
    const attribute = e.target.getAttribute('id');
    if (attribute === 'title') {
      setTitle(e.target.value);
    } else if (attribute === 'description') {
      setDescription(e.target.value);
    } else if (attribute === 'time') {
      setTime(e.target.value);
    } else if (attribute === 'date') {
      setDate(e.target.value);
    } else if (attribute === 'origin') {
      setOrigin(e.target.value);
    } else if (attribute === 'destination') {
      setDestination(e.target.value);
    } else if (attribute === 'email') {
      setEmail(e.target.value);
    }
    if (e.target.value === '') {
      if (attribute === 'title') {
        setTitleError(true);
      } else if (attribute === 'description') {
        setDescriptionError(true);
      } else if (attribute === 'time') {
        setTimeError(true);
      } else if (attribute === 'email') {
        setEmailError(true);
      } else if (attribute === 'date') {
        setDateError(true);
      } else if (attribute === 'destination') {
        setDestinationError(true);
        setMarker(null);
      }
    } else {
      if (attribute === 'title') {
        setTitleError(false);
      } else if (attribute === 'email') {
        setEmailError(false);
      } else if (attribute === 'description') {
        setDescriptionError(false);
      } else if (attribute === 'time') {
        setTimeError(false);
      } else if (attribute === 'date') {
        setDateError(false);
      } else if (attribute === 'destination') {
        setDestinationError(false);
        setMarker(null);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12} sm={6} container spacing={3}>
            <FormInput anError={titleError} handleChange={handleChange} id="title" value={title}/>
            <FormInput anError={descriptionError} handleChange={handleChange} id="description" value={description}/>
            <FormInput anError={dateError} handleChange={handleChange} id="date" value={date} />
            <FormInput anError={timeError} handleChange={handleChange} id="time" value={time} />
            <AutocompleteComponent handlePlaceChanged={handlePlaceChanged} handleChange={handleChange} id="origin" value={origin} />
            <AutocompleteComponent handlePlaceChanged={handlePlaceChanged} anError={destinationError} handleChange={handleChange} id="destination" value={destination} />
        </Grid>
        <Grid item container alignContent="space-between" spacing={3} xs={12} sm={6}>
          <Grid item xs={12} className={on ? classes.height2 : classes.height}>
            <Map marker={marker} center={center} handleLoad={handleMapLoad}/>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel className={classes.switch}
              control={<Switch checked={on} onChange={() => setOn(!on)} />}
              label="Normal"
              labelPlacement="start"
            />
          </Grid>
          {on &&
            <Grid item xs={12}>
              <FormInput anError={emailError} handleChange={handleChange} id="email" value={email} />
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
