import React from 'react';
import { Button, Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default function BackButton() {

  return (
      <Grid container alignItems='center'>
        <Grid item>
          <Button onClick={() => { window.history.back(); }} variant="text" color="secondary">
            <ArrowBackIosIcon />
            <u>BACK</u>
          </Button>
        </Grid>
      </Grid>
  );
}
