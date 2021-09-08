import { Button, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import FormInput from './text-field';

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

  const handleSubmit = e => {
    e.preventDefault();
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
  };

  const classes = useStyles();

  return (
    <Container maxWidth="lg" >
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.heading}>
        Create An Event
      </Typography>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12} sm={6} container spacing={3}>
          <Grid item xs={12} >
            <FormInput handleChange={handleChange} id="title" value={title}/>
          </Grid>
          <Grid item xs={12}>
            <FormInput handleChange={handleChange} id="description" value={description}/>
          </Grid>
          <Grid item xs={12}>
            <FormInput handleChange={handleChange} id="date" value={date} />
          </Grid>
          <Grid item xs={12}>
            <FormInput handleChange={handleChange} id="time" value={time} />
          </Grid>
          <Grid item xs={12}>
            <FormInput handleChange={handleChange} id="origin" value={origin} />
          </Grid>
          <Grid item xs={12}>
            <FormInput handleChange={handleChange} id="destination" value={destination} />
          </Grid>
        </Grid>
        <Grid item container spacing={3} xs={12} sm={6}>
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent='center'>
        <Grid item>
          <Button type='submit' variant="contained" color="primary">
            SUBMIT
          </Button>
        </Grid>
      </Grid>
    </form>
    </Container>
  );
}
