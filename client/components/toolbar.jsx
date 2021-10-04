import React, { useContext, useState } from 'react';
import { AppBar, CssBaseline, IconButton, Toolbar, Typography, ListItemIcon, ListItemText, MenuItem, Menu, Grid } from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { UserContext } from '../app';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function Header(props) {
  const contextValues = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const { route, handleSignOut, token, classes } = contextValues;

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <CssBaseline/>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems='center'>
              <IconButton
                className={classes.icon}
                aria-controls="menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}
              >
                <MenuIcon className={classes.white} />
              </IconButton>
              <Menu
                disableAutoFocus={true}
                className={classes.paper}
                id="menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}
                value={route.path}
              >
                <a href='#'>
                  <MenuItem onClick={handleClose} className={route.path === '' ? `${classes.menuRoot} ${classes.pink}` : ''}>
                    <Grid container alignItems='center'>
                      <ListItemIcon>
                        <TodayIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Events" />
                    </Grid>
                  </MenuItem>
                </a>
                <a href='#search'>
                  <MenuItem onClick={handleClose} className={route.path === 'search' ? `${classes.menuRoot} ${classes.pink}` : ''}>
                    <Grid container alignItems='center'>
                      <ListItemIcon>
                        <SearchIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Search" />
                    </Grid>
                  </MenuItem>
                </a>
                {token &&
                  <a href='#sign-in'>
                    <MenuItem onClick={() => {
                      handleClose();
                      handleSignOut();
                    }}>
                      <Grid container alignItems='center'>
                        <ListItemIcon>
                          <ExitToAppIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </Grid>
                  </MenuItem>
                  </a>}
              </Menu>
              <a href='#'>
              <Typography variant="h4" color="inherit" noWrap>
                Ant&apos;s Events
              </Typography>
              </a>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
