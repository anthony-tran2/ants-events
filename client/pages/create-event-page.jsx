import React from 'react';
import EventForm from '../components/event-form';
import { Container, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => (
  {
    heading: {
      fontSize: '2.5rem',
      fontWeight: '300',
      marginTop: '0.35em'
    }
  }
));

export default function CreateEvent(props) {
  const classes = useStyles();
  return (
    <>
    <main>
      <Container maxWidth="lg" >
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.heading}>
          Create An Event
        </Typography>
        <EventForm/>
      </Container>
    </main>
    </>
  );
}
