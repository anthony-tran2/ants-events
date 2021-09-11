import { Card, Grid, Typography, CardContent, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import BackButton from '../components/back-button';
import Map from '../components/map';
import { utcToZonedTime } from 'date-fns-tz';

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

  const handleLoad = () => {
    const coords = event.coords.destinationCoords;
    setCenter(coords);
    setMarker(coords);
  };

  useEffect(() => {
    fetch(`api/events/${props.eventId}`)
      .then(res => res.json())
      .then(result => {
        setEvent(result);
      });
  }, []);

  const classes = useStyles();

  const render = () => {
    if (!event) return null;
    const { title, description, timestamp, origin, destination } = event;
    const newDate = new Date(timestamp);
    const zonedDate = `${utcToZonedTime(newDate, Intl.DateTimeFormat().resolvedOptions().timeZone)}`;
    const dateArray = zonedDate.split(' ');
    const date = `${dateArray[0]} ${dateArray[1]} ${dateArray[2]} ${dateArray[3]}`;
    const firstTwo = parseInt(dateArray[4][0] + dateArray[4][1]);
    const rest = dateArray[4].slice(2, 3);
    let time = null;
    if (firstTwo > 12) {
      time = `${firstTwo - 12}${rest} a.m.`;
    } else if (firstTwo === 0) {
      time = `${dateArray[4].slice(0, 5)} a.m.`;
    } else time = `${dateArray[4].slice(0, 5)} p.m.`;
    return (
      <>
      <main>
        <Container maxWidth="lg">
          <Grid container justifyContent='center'>
            <Grid item container className={classes.spacingbutton} justifyContent='flex-start'>
              <BackButton />
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <Grid container>
                  <Grid item xs={12}>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={12} sm={6}>
                          <Typography component="h1" variant="h6" align="center" className={classes.heading} color="textPrimary" gutterBottom>
                          {title}
                          </Typography>
                          <Typography className={classes.spacingtext} color="secondary">
                            {description}
                          </Typography>
                          <Typography className={classes.spacingtext} color="secondary">
                              <span className={classes.bold}>Date: </span><span>{date}</span>
                          </Typography>
                          <Typography className={classes.spacingtext} color="secondary">
                            <span className={classes.bold}>Time: </span><span>{time}</span>
                          </Typography>
                          <Typography className={classes.spacingtext} color="secondary">
                            <span className={classes.bold}>Origin: </span><span>{origin}</span>
                          </Typography>
                          <Typography className={classes.spacingtext} color="secondary">
                            <span className={classes.bold}>Destination: </span><span>{destination}</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Map handleLoad={handleLoad} center={center} marker={marker} />
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
  };

  return render();
}
