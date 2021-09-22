import { Grid, TextField } from '@material-ui/core';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { UserContext } from '../app';

export default function FormInput(props) {
  const contextValues = useContext(UserContext);
  const { classes } = contextValues;

  const selectType = () => {
    if (props.id === 'date') {
      return 'date';
    } else if (props.id === 'time') {
      return 'time';
    } else if (props.id === 'email') {
      return 'email';
    } else return 'text';
  };

  const selectMin = () => {
    if (props.id === 'date') {
      return { min: format(new Date(), 'yyyy-MM-dd') };
    } else if (props.id === 'time') {
      return { min: format(new Date(), 'HH:mm') };
    }
  };

  return (
    <Grid item xs={12}>
      <TextField
        type={selectType()}
        required={props.id !== 'origin'}
        onChange={e => {
          if (props.initial) props.setInitial(false);
          props.handleChange(e);
        }}
        fullWidth
        label={props.id.split('').map((value, i) => i === 0 ? value.toUpperCase() : value).join('')}
        variant="outlined"
        color="secondary"
        id={props.id}
        value={props.value}
        className={classes.root}
        InputLabelProps={{
          shrink: true
        }}
        placeholder=''
        inputProps={selectMin()}
      />
    </Grid>
  );
}
