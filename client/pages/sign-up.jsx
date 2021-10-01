import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import { UserContext } from '../app';

export default function SignUp() {
  const [account, setAccount] = useState({
    username: '',
    password: ''
  });
  const [usernames, setUsernames] = useState([]);
  const [error, setError] = useState(false);
  const [taken, setTaken] = useState(false);
  const contextValues = useContext(UserContext);
  const { handleSignIn, route } = contextValues;
  const { classes } = contextValues;

  useEffect(() => {
    fetch('/api/users/usernames')
      .then(res => res.json())
      .then(result => {
        setUsernames(result);
      });
    contextValues.loading(false);
  }, []);

  useEffect(() => {
    if (route.path === 'sign-in') {
      setAccount({
        username: 'demouser',
        password: 'password1'
      });
    } else if (route.path === 'sign-up') {
      setAccount({
        username: '',
        password: ''
      });
    }
  }, [route.path]);

  const handleChange = e => {
    setAccount({ ...account, [e.target.getAttribute('id')]: e.target.value });
    if (route.path === 'sign-up') {
      for (let i = 0; i < usernames.length; i++) {
        if (usernames[i].username === e.target.value || usernames[i].username === account.username) {
          return setTaken(true);
        } else setTaken(false);
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { username, password } = account;
    if (route.path === 'sign-up') {
      for (let i = 0; i < usernames.length; i++) {
        if (usernames[i].username === e.target.value || usernames[i].username === account.username) {
          return setTaken(true);
        } else setTaken(false);
      }
    }
    if (!username || !password || taken) return setError(true); else {
      setError(false);
      const init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
      };
      fetch(`/api/auth/${route.path}`, init)
        .then(res => res.json())
        .then(result => {
          if (route.path === 'sign-up') {
            setAccount({
              username: '',
              password: ''
            });
            window.location.hash = '#sign-in';
          }
          if (route.path === 'sign-in') {
            if (!result.error) {
              handleSignIn(result);
              window.location.hash = '#';
            } else setError(true);
          }
        })
        .catch(err => console.error(err));
    }
  };

  if (contextValues.isLoading) {
    return (
  <Grid container justifyContent="center">
    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </Grid>
    );
  }
  return (
    <Container maxWidth="lg">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.heading}>
          {route.path === 'sign-in' ? 'SIGN IN' : 'SIGN UP'}
        </Typography>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={4} direction="column" alignItems="center" justifyContent="center">
          {(error && route.path === 'sign-up') &&
              <Typography align='center' style={{ color: '#DB5461' }}>Invalid username and password are required! Try again.</Typography>}
          {(error && route.path === 'sign-in') &&
            <Typography align='center' style={{ color: '#DB5461' }}>Invalid login.</Typography>}
      <Grid item>
        <TextField
          required
          onChange={handleChange}
          fullWidth
          label="Username"
          variant="outlined"
          color="secondary"
          id="username"
          value={account.username}
          className={classes.root}
          inputProps={route.path === 'sign-up' ? { minLength: 6, maxLength: 20 } : {}}
          />
            {(taken && contextValues.route.path === 'sign-up') &&
              <Typography align='center' style={{ color: '#DB5461' }}>Username taken! Try a different one.</Typography>}
      </Grid>
      <Grid item>
        <TextField
          type="password"
          required
          onChange={handleChange}
          fullWidth
          label="Password"
          variant="outlined"
          color="secondary"
          id="password"
          value={account.password}
          className={classes.root}
          inputProps={route.path === 'sign-up' ? { minLength: 6, maxLength: 20 } : {}}
          />
      </Grid>
      <Grid item>
            <a style={{ textDecoration: 'underline', color: '#8AA29E' }} href={route.path === 'sign-in' ? '#sign-up' : '#sign-in'}>
          {route.path === 'sign-in' ? "Don't have an account? Register here." : 'Already have an account? Log in here.'}
        </a>
      </Grid>
      <Grid item>
        <Button type='submit' variant="contained" color="primary">
          {route.path === 'sign-in' ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </Grid>
      </Grid>
      </form>
    </Container>
  );

}
