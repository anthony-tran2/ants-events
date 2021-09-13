import { Grid, makeStyles, TextField } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';

const useStyles = makeStyles(theme => (
  {
    root: {
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px'
      }
    }
  }
));

export default function FormInput(props) {
  const classes = useStyles();

  const selectType = () => {
    if (props.id === 'date') {
      return 'date';
    } else if (props.id === 'time') {
      return 'time';
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
        error={props.id === 'origin' ? false : props.anError}
        required={props.id !== 'origin'}
        onChange={props.handleChange}
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
