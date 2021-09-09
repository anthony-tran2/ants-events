import { Button, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import FormInput from './text-field.jsx';
import Map from './map.jsx';
import AutocompleteComponent from './autocomplete.jsx';
const { zonedTimeToUtc } = require('date-fns-tz');

const useStyles = makeStyles(theme => (
  {
    heading: {
      fontSize: '2.5rem',
      fontWeight: '300',
      marginTop: '0.35em'
    }
  }
));

export default function EventForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
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
      if (target === 'destination') {
        const newCenter = { ...center };
        newCenter.lat = autocomplete.getPlace().geometry.location.lat();
        newCenter.lng = autocomplete.getPlace().geometry.location.lng();
        setCenter(newCenter);
        setMarker(newCenter);
      }
      target === 'origin'
        ? setOrigin(autocomplete.getPlace().formatted_address)
        : setDestination(autocomplete.getPlace().formatted_address);
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
    if (title && description && time && date && destination) {
      const zonedDate = `${date} ${time}:00`;
      const timestamp = zonedTimeToUtc(zonedDate, Intl.DateTimeFormat().resolvedOptions().timeZone);
      const init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, timestamp, origin, destination })
      };
      fetch('/api/events', init)
        .then(() => {
          setTitle('');
          setDescription('');
          setTime('');
          setDate('');
          setOrigin('');
          setDestination('');
          setTitleError(false);
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
    }
    if (e.target.value === '') {
      if (attribute === 'title') {
        setTitleError(true);
      } else if (attribute === 'description') {
        setDescriptionError(true);
      } else if (attribute === 'time') {
        setTimeError(true);
      } else if (attribute === 'date') {
        setDateError(true);
      } else if (attribute === 'destination') {
        setDestinationError(true);
        setMarker(null);
      }
    } else {
      if (attribute === 'title') {
        setTitleError(false);
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

  const classes = useStyles();

  return (
    <Container maxWidth="lg" >
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.heading}>
        Create An Event
      </Typography>
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
        <Grid item container spacing={3} xs={12} sm={6}>
          <Grid item xs={12}>
            <Map marker={marker} center={center} handleLoad={handleMapLoad}/>
          </Grid>
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
    </Container>
  );
}
