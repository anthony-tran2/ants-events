import { makeStyles, TextField } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => (
  {
    borderRadius: {
      borderRadius: '8px'
    }
  }
));

export default function FormInput(props) {
  const classes = useStyles();

  return (
    <TextField
      onChange={props.handleChange}
      fullWidth
      label={props.id.split('').map((value, i) => i === 0 ? value.toUpperCase() : value).join('')}
      variant="outlined"
      color="secondary"
      id={props.id}
      value={props.value}
      className={classes.borderRadius}
    />
  );
}
