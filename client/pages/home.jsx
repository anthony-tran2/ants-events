import React, { useContext, useEffect, useState } from 'react';
import { Container, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SmallEventCard from '../components/small-event-card';
import { UserContext } from '../app';

const useStyles = makeStyles(theme => (
  {
    heading: {
      fontSize: '2.5rem',
      fontWeight: '300',
      marginTop: '0.35em'
    },

    cardgrid: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    },

    card: {
      height: '11rem',
      display: 'flex',
      flexDirection: 'column'
    },

    cardContent: {
      flexGrow: 1,
      maxHeight: '8rem'
    }
  }
));

export default function Home(props) {
  const [eventList, setEventList] = useState(null);
  const classes = useStyles();
  const contextValues = useContext(UserContext);

  useEffect(() => {
    fetch('/api/events', { headers: { authorization: contextValues.token } })
      .then(res => res.json())
      .then(result => setEventList(result))
      .catch(err => console.error(err));
    return () => setEventList(null);
  }, []);

  if (!contextValues.token) {
    window.location.hash = '#sign-in';
    return null;
  }
  return (
      <>
      <main>
        <Container maxWidth="lg" >
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
