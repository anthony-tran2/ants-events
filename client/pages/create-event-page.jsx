import React, { useContext } from 'react';
import EventForm from '../components/event-form';
import { Container, Typography, makeStyles, Grid, useMediaQuery } from '@material-ui/core';
import BackButton from '../components/back-button';
import { UserContext } from '../app';

const useStyles = makeStyles(theme => (
  {
    heading: {
      fontSize: '2.5rem',
      fontWeight: '300',
      marginTop: '0.35em'
    },

    absolute: {
      position: 'absolute'
    },

    height: {
      height: '2.5rem'
    }
  }
));

export default function CreateEvent(props) {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:500px)');
  const contextValues = useContext(UserContext);
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
