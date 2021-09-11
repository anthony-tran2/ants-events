import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

export default function NotFound() {
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
