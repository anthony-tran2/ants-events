import React, { forwardRef, useContext, useEffect, useState } from 'react';
import EventForm from '../components/event-form';
import { Container, Typography, Grid, Button, Dialog, Slide, DialogTitle, DialogActions } from '@material-ui/core';
import BackButton from '../components/back-button';
import { utcToZonedTime } from 'date-fns-tz';
import format from 'date-fns/format';
import { UserContext } from '../app';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditEvent(props) {
  const [editValues, setEditValues] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const contextValues = useContext(UserContext);
  const { classes } = contextValues;

  useEffect(() => {
    fetch(`/api/events/${props.eventId}`, { headers: { authorization: contextValues.token } })
      .then(res => res.json())
      .then(result => {
        const { coords, description, destination, email, eventId, notification: on, origin, timestamp, title } = result;
        const zonedDate = utcToZonedTime(timestamp, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const date = format(zonedDate, 'yyyy-MM-dd');
        const time = format(zonedDate, 'HH:mm');
        setEditValues({ originCoords: coords.originCoords, destinationCoords: coords.destinationCoords, description, destination, email, eventId, on, origin, title, date, time });
        contextValues.loading(false);
        return () => { setEditValues({ originCoords: coords.originCoords, destinationCoords: coords.destinationCoords, description, destination, email, eventId, on, origin, title, date, time }); };
      })
      .catch(err => console.error(err));
  }, []);

  const handleClick = () => {
    setDeleteModal(true);
  };

  const handleClose = () => {
    setDeleteModal(false);
  };

  const handleDelete = () => {
    fetch(`/api/events/${props.eventId}`, { method: 'DELETE', headers: { authorization: contextValues.token } })
      .then(() => {
        window.location.hash = '#';
      })
      .catch(err => console.error(err));
  };

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
          <Grid container justifyContent='center'>
            <Grid item container className={`${classes.height}`} justifyContent="space-between" alignContent="center">
              <Grid item>
                <BackButton/>
              </Grid>
              <Grid item>
                <Button onClick={handleClick} variant="contained" className={classes.redButton}>
                  DELETE
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Dialog
            open={deleteModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="delete-modal"
            maxWidth="xs"
          >
            <Grid container justifyContent="center" className={classes.modal}>
              <DialogTitle>
              <Grid item xs={12}>
                <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom style={{ fontWeight: 'bold' }}>
                  Are you sure you
                </Typography>
                <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom style={{ fontWeight: 'bold' }}>
                  want to delete
                </Typography>
                <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom style={{ fontWeight: 'bold' }}>
                  this event?
                </Typography>
              </Grid>
              </DialogTitle>
              <Grid item xs={12}>
                <DialogActions>
                  <Grid item xs={12} container justifyContent="space-around">
                    <Grid item>
                      <Button onClick={handleDelete} variant="contained" className={`${classes.redButton} ${classes.modalButtons}`}>YES</Button>
                    </Grid>
                    <Grid item>
                      <Button onClick={handleClose} variant="contained" color="secondary" className={classes.modalButtons} style={{ color: '#fff' }}>CANCEL</Button>
                    </Grid>
                  </Grid>
                </DialogActions>
              </Grid>
            </Grid>
          </Dialog>
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
