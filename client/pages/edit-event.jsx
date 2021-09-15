import React, { useEffect, useState } from 'react';
import EventForm from '../components/event-form';
import { Container, Typography, makeStyles, Grid, useMediaQuery } from '@material-ui/core';
import BackButton from '../components/back-button';
import { utcToZonedTime } from 'date-fns-tz';
import format from 'date-fns/format';

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

export default function EditEvent(props) {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:500px)');
  const [editValues, setEditValues] = useState(null);

  useEffect(() => {
    fetch(`/api/events/${props.eventId}`)
      .then(res => res.json())
      .then(result => {
        const { coords, description, destination, email, eventId, notification: on, origin, timestamp, title } = result;
        const zonedDate = utcToZonedTime(timestamp, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const date = format(zonedDate, 'yyyy-MM-dd');
        const time = format(zonedDate, 'HH:mm');
        setEditValues({ coords, description, destination, email, eventId, on, origin, title, date, time });
        return () => { setEditValues({ coords, description, destination, email, eventId, on, origin, title, date, time }); };
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <main>
        <Container maxWidth="lg" >
          <Grid container className={`${matches ? classes.absolute : ''} ${classes.height}`} alignItems='center'>
            <BackButton hash={`#events?eventId=${props.eventId}`} />
          </Grid>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.heading}>
            Edit An Event
          </Typography>
          {editValues &&
            <EventForm editValues={editValues}/>}
        </Container>
      </main>
    </>
  );
}
