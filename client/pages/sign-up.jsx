import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => (
  {
    root: {
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px'
      }
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: '300',
      marginTop: '0.35em'
    }
  }
));

export default function SignUp() {
  const classes = useStyles();
  const [account, setAccount] = useState({
    username: '',
    password: ''
  });
  const [usernames, setUsernames] = useState(null);
  const [error, setError] = useState(false);
  const [taken, setTaken] = useState(false);

  useEffect(() => {
    fetch('/api/users/usernames')
      .then(res => res.json())
      .then(result => setUsernames(result))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    setAccount({ ...account, [e.target.getAttribute('id')]: e.target.value });
  };

  const handleSubmit = e => {
    const { username, password } = account;
    usernames.forEach(value => { if (value === username) setTaken(true); });
    if (!username || !password || taken) return setError(true);
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: account
    };
    fetch('/api/auth/sign-up', init)
      .then(() => {
        setAccount({
          username: '',
          password: ''
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit}>
      <Grid container spacing={4} direction="column" alignItems="center" justifyContent="center">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.heading}>
          Sign Up
        </Typography>
          {error &&
              <Typography align='center' style={{ color: '#DB5461' }}>Invalid username and password are required! Try again.</Typography>}
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
          />
            {taken &&
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
          />
      </Grid>
      <Grid item>
        <Button type='submit' variant="contained" color="primary">
          SIGN UP
        </Button>
      </Grid>
      </Grid>
      </form>
    </Container>
  );
}
