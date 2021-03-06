import { Card, Grid, Typography, CardContent, Container, Button } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import BackButton from '../components/back-button';
import Map from '../components/map';
import timestampConversion from '../lib/date-and-time-conversion';
import CheckIcon from '@material-ui/icons/Check';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { UserContext } from '../app';

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
  const contextValues = useContext(UserContext);

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
    fetch(`api/events/${props.eventId}`, { headers: { authorization: contextValues.token } })
      .then(res => res.json())
      .then(result => {
        setEvent(result);
        setDirOptions({ ...dirOptions, destination: result.destination, origin: result.origin });
        contextValues.loading(false);
      });
  }, []);

  const { classes } = contextValues;

  if (!contextValues.token) {
    window.location.hash = '#sign-in';
    return null;
  }
  if (!event) return null;
  if (contextValues.isLoading) {
    return (
      <Grid container justifyContent="center">
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </Grid>
    );
  }
  const { title, description, timestamp, origin, destination, notification, email } = event;
  const newTimestamp = timestampConversion(timestamp);
  return (
      <>
      <main>
        <Container maxWidth="lg">
          <Grid container justifyContent='center'>
            <Grid item container className={classes.spacingbutton} justifyContent="space-between">
              <Grid item>
                <BackButton/>
              </Grid>
              <Grid item>
                <a href={`#edit-events?eventId=${props.eventId}`}>
                  <Button variant="contained" color="primary">
                    EDIT
                  </Button>
                </a>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.cardDetails}>
                <Grid container>
                  <Grid item xs={12}>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={12} sm={6} container direction="column">
                          <Typography component="h1" variant="h6" align="center" className={classes.heading} color="textPrimary" gutterBottom>
                          {title}
                          </Typography>
                          <Typography className={classes.spacingtext} color="primary">
                            {description}
                          </Typography>
                          <Typography className={classes.spacingtext} color="primary">
                              <span className={classes.bold}>Date: </span><span>{newTimestamp.date}</span>
                          </Typography>
                          <Typography className={classes.spacingtext} color="primary">
                            <span className={classes.bold}>Time: </span><span>{newTimestamp.time}</span>
                          </Typography>
                          {origin &&
                          <Typography className={classes.spacingtext} color="primary">
                            <span className={classes.bold}>Origin: </span><span>{origin}</span>
                          </Typography>}
                          <Typography className={classes.spacingtext} color="primary">
                            <span className={classes.bold}>Destination: </span><span>{destination}</span>
                          </Typography>
                          <Grid item container className={classes.spacingtext}>
                              <Typography color="primary">
                                <span className={classes.bold}>Opted in for notification</span>
                              </Typography>
                            {notification ? <CheckIcon style={{ color: '#2EF72E' }} /> : <NotInterestedIcon style={{ color: '#DB5461' }}/>}
                          </Grid>
                          {notification &&
                            <Typography className={classes.spacingtext} color="primary">
                              <span className={classes.bold}>Email: </span><span>{email}</span>
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
