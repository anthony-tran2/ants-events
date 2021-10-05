import React, { useContext, useEffect, useState } from 'react';
import { Container, Button, Grid, Typography } from '@material-ui/core';
import SmallEventCard from '../components/small-event-card';
import { UserContext } from '../app';
import FirstTime from '../components/first-time';

export default function Home(props) {
  const [eventList, setEventList] = useState(null);
  const contextValues = useContext(UserContext);
  const { classes } = contextValues;

  useEffect(() => {
    fetch('/api/events', { headers: { authorization: contextValues.token } })
      .then(res => res.json())
      .then(result => {
        setEventList(result);
        contextValues.loading(false);
      })
      .catch(err => console.error(err));
    return () => setEventList(null);
  }, []);

  if (!contextValues.token) {
    window.location.hash = '#sign-in';
    return null;
  }
  if (contextValues.isLoading) {
    return (
      <Grid container justifyContent="center">
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </Grid>
    );
  }
  return (
      <>
      <main>
        <Container maxWidth="lg" >
          <FirstTime />
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.heading}>
            Your Events
          </Typography>
          <Grid container justifyContent='center'>
            <a href='#create-events'>
              <Button variant="contained" color="primary">
                CREATE AN EVENT
              </Button>
            </a>
          </Grid>
            {eventList &&
              <Grid container spacing={4} className={classes.cardgrid}>
                {eventList.map(event => <SmallEventCard key={event.eventId} eventId={event.eventId} title={event.title} description={event.description} />)}
              </Grid>
            }
        </Container>
      </main>
      </>
  );
}
