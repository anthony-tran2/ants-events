import { Card, Grid, Typography, CardContent, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useCallback, useEffect, useState } from 'react';
import BackButton from '../components/back-button';
import Map from '../components/map';
import timestampConversion from '../lib/date-and-time-conversion';
import CheckIcon from '@material-ui/icons/Check';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const useStyles = makeStyles(theme => (
  {
    heading: {
      fontSize: '1.7rem',
      fontWeight: '300',
      marginTop: '0.35em'
    },

    bold: {
      fontWeight: '700'
    },

    card: {
      height: '100%'
    },

    mapHeight: {
      minHeight: '20rem'
    },

    spacingbutton: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },

    spacingtext: {
      marginBottom: theme.spacing(2)
    }
  }
));

export default function EventDetails(props) {
  const [event, setEvent] = useState(null);
  const [center, setCenter] = useState(null);
  const [marker, setMarker] = useState(null);
  const [dirOptions, setDirOptions] = useState(
    {
      destination: null,
      origin: null,
      travelMode: 'DRIVING'
    }
  );
  const [dirRes, setDirRes] = useState(null);

  const handleLoad = () => {
    const coords = event.coords.destinationCoords;
    setCenter(coords);
    setMarker(coords);
  };

  const directionsCallback = useCallback(res => {
    if (res !== null) {
      if (res.status === 'OK') {
        setDirRes(res);
      }
    }
  }, []);

  useEffect(() => {
    fetch(`api/events/${props.eventId}`)
      .then(res => res.json())
      .then(result => {
        setEvent(result);
        setDirOptions({ ...dirOptions, destination: result.destination, origin: result.origin });
      });
  }, []);

  const classes = useStyles();

  if (!event) return null;
  const { title, description, timestamp, origin, destination, notification, email } = event;
  const newTimestamp = timestampConversion(timestamp);
  return (
      <>
      <main>
        <Container maxWidth="lg">
          <Grid container justifyContent='center'>
            <Grid item container className={classes.spacingbutton} justifyContent='flex-start'>
              <BackButton hash={props.hash} />
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <Grid container>
                  <Grid item xs={12}>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={12} sm={6} container direction="column">
                          <Typography component="h1" variant="h6" align="center" className={classes.heading} color="textPrimary" gutterBottom>
                          {title}
                          </Typography>
                          <Typography className={classes.spacingtext} color="secondary">
                            {description}
                          </Typography>
                          <Typography className={classes.spacingtext} color="secondary">
                              <span className={classes.bold}>Date: </span><span>{newTimestamp.date}</span>
                          </Typography>
                          <Typography className={classes.spacingtext} color="secondary">
                            <span className={classes.bold}>Time: </span><span>{newTimestamp.time}</span>
                          </Typography>
                          {origin &&
                          <Typography className={classes.spacingtext} color="secondary">
                            <span className={classes.bold}>Origin: </span><span>{origin}</span>
                          </Typography>}
                          <Typography className={classes.spacingtext} color="secondary">
                            <span className={classes.bold}>Destination: </span><span>{destination}</span>
                          </Typography>
                          <Grid item container className={classes.spacingtext}>
                              <Typography color="secondary">
                                <span className={classes.bold}>Opted in for notification</span>
                              </Typography>
                            {notification ? <CheckIcon style={{ color: '#2EF72E' }} /> : <NotInterestedIcon style={{ color: '#DB5461' }}/>}
                          </Grid>
                          {notification &&
                            <Typography className={classes.spacingtext} color="secondary">
                              <span className={classes.bold}>Origin: </span><span>{email}</span>
                            </Typography>}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Map handleLoad={handleLoad} center={center} marker={marker} dirOptions={dirOptions} dirRes={dirRes} directionsCallback={directionsCallback}/>
                        </Grid>
                    </Grid>
                    </CardContent>
                    </Grid>
                </Grid>
              </Card>
            </Grid>
        </Grid>
        </Container>
      </main>
      </>
  );
}
