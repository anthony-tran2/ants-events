import React from 'react';
import EventForm from '../components/event-form';
import { Container, Typography, makeStyles, Grid } from '@material-ui/core';
import BackButton from '../components/back-button';

const useStyles = makeStyles(theme => (
  {
    heading: {
      fontSize: '2.5rem',
      fontWeight: '300',
      marginTop: '0.35em'
    },

    absolute: {
      position: 'absolute',
      height: '2.5rem'
    }
  }
));

export default function CreateEvent(props) {
  const classes = useStyles();
  return (
    <>
    <main>
      <Container maxWidth="lg" >
          <Grid container className={classes.absolute} alignItems='center'>
          <BackButton />
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
