import React from 'react';
import { AppBar, CssBaseline, makeStyles, Toolbar, Typography } from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';

const useStyles = makeStyles(theme => (
  {
    icon: {
      marginRight: theme.spacing(2)
    }
  }));

export default function Header() {
  const classes = useStyles();
  return (
    <>
    <CssBaseline/>
      <AppBar position="static">
        <Toolbar>
          <TodayIcon className={classes.icon} />
          <Typography variant="h4" color="inherit" noWrap>
            Ant&apos;s Events
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
