import React, { useContext } from 'react';
import EventForm from '../components/event-form';
import { Container, Typography, Grid, useMediaQuery } from '@material-ui/core';
import BackButton from '../components/back-button';
import { UserContext } from '../app';

export default function CreateEvent(props) {
  const matches = useMediaQuery('(min-width:500px)');
  const contextValues = useContext(UserContext);
  const { classes } = contextValues;

  if (!contextValues.token) {
    window.location.hash = '#sign-in';
    return null;
  }
  return (
    <>
    <main>
      <Container maxWidth="lg" >
          <Grid container className={`${matches ? classes.absolute : ''} ${classes.height}`} alignItems='center'>
          <BackButton/>
        </Grid>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.heading}>
          Create An Event
        </Typography>
        <EventForm/>
      </Container>
    </main>
    </>
  );
}
