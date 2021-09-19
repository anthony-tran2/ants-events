import React, { useContext } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { UserContext } from '../app';

export default function NotFound() {
  const contextValues = useContext(UserContext);
  if (!contextValues.token) {
    window.location.hash = '#sign-in';
    return null;
  }
  return (
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item>
        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom >
          Uh oh, we could not find the page you were looking for!
        </Typography>
      </Grid>
      <Grid item>
        <a href='#'>
          <Button variant="contained" color="primary">
            RETURN TO HOME PAGE
          </Button>
        </a>
      </Grid>
    </Grid>
  );

}
