import React from 'react';

export default function Toolbar() {
  return (
    <>
      <AppBar>
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
