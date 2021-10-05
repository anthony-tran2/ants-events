import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { Grid, Dialog, DialogActions, Typography, Button, Slide } from '@material-ui/core';
import { UserContext } from '../app.jsx';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FirstTime() {
  const [open, setOpen] = useState(false);
  const contextValues = useContext(UserContext);
  const classes = contextValues.classes;

  useEffect(() => {
    const init = {
      headers: {
        'Content-Type': 'application/json',
        authorization: contextValues.token
      }
    };
    fetch('/api/users/firstTime', init)
      .then(res => res.json())
      .then(result => {
        if (result.firstTime) setOpen(true);
      })
      .catch(err => console.error(err));
  }, []);

  const handleClose = e => {
    const init = {
      method: 'PATCH',
      headers: {
        authorization: contextValues.token
      }
    };
    fetch('/api/users/firstTime', init)
      .then(result => {
        if (result) setOpen(false);
      })
      .catch(err => console.error(err));
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="firstTime-modal"
      maxWidth="xs"
    >
      <Grid container justifyContent="center" className={classes.firstTimeModal}>
        <Grid item xs={12}>
          <Typography className={classes.padding1} component="h1" variant="h4" align="center" color="textPrimary" gutterBottom style={{ fontWeight: 'bold' }}>
            Welcome to Ant&apos;s Event!
          </Typography>
        </Grid>
        <Grid item xs={10}>
            <p>Get started by clicking the <strong>CREATE AN EVENT</strong> button to create your first event!</p>
            <p>To view your events click the <strong>VIEW</strong> button on the event card.</p>
            <p>In your event&apos;s details you can press the <strong>EDIT</strong> button to edit your events</p>
            <p>You can delete an event by pressing the <strong>DELETE</strong> button on your edit page.</p>
            <p><strong>Want email notifications?</strong></p>
            <ul>
              <li>opt in for email notification</li>
              <li>provide valid email address</li>
              <li>Email reminder will be sent when the time difference is less than 6 hours from the current time</li>
            </ul>
            <p><strong>Want to see your route?</strong></p>
            <p>When providing both an <em>origin</em> and <em>destination</em>, the directions will automatically render on the map.</p>
        </Grid>
        <Grid item xs={12}>
          <DialogActions className={classes.padding1}>
            <Grid item xs={12} container justifyContent="space-around">
                <Button onClick={handleClose} variant="contained" color="secondary" className={classes.modalButtons} style={{ color: '#fff' }}>Got it!</Button>
            </Grid>
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  );
}
