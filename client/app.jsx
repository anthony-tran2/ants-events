import React, { useState, useEffect } from 'react';
import CreateEvent from './pages/create-event-page.jsx';
import Home from './pages/home.jsx';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme, Typography, makeStyles } from '@material-ui/core';
import Header from './components/toolbar';
import parseRoute from './lib/parse-route.js';
import NotFound from './pages/not-found.jsx';
import EventDetails from './pages/event-details.jsx';
import SearchPage from './pages/search.jsx';
import EditEvent from './pages/edit-event.jsx';
import SignUp from './pages/sign-up.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3D5467'
    },
    secondary: {
      main: '#8AA29E'
    },
    background: {
      default: '#fff'
    },
    error: {
      main: '#DB5461'
    }
  }
});

const useStyles = makeStyles(theme => (
  {
    heading: {
      fontSize: '2.5rem',
      fontWeight: '300',
      marginTop: '2rem'
    }
  }
));

export const UserContext = React.createContext();

export default function App() {
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [token, setToken] = useState(null);
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setRoute(parseRoute(window.location.hash));
      if (route.path !== 'sign-up' || route.path !== 'sign-in') setIsLoading(false); else setIsLoading(true);
    });
    window.addEventListener('online', () => {
      setNetworkError(false);
    });
    window.addEventListener('offline', () => {
      setNetworkError(true);
    });
    if (window.localStorage.getItem('jwt-token')) setToken(window.localStorage.getItem('jwt-token')); else setToken(null);
    setIsAuthorizing(false);
  }, []);

  const handleSignIn = result => {
    window.localStorage.setItem('jwt-token', result);
    setToken(result);
  };

  const handleSignOut = result => {
    window.localStorage.removeItem('jwt-token');
    setToken(null);
  };

  const loading = boolean => {
    setIsLoading(boolean);
  };

  const renderPage = () => {
    if (route.path === 'sign-up' || route.path === 'sign-in') {
      return <SignUp />;
    }
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'events') {
      const eventId = route.params.get('eventId');
      return <EventDetails eventId={eventId}/>;
    }
    if (route.path === 'edit-events') {
      const eventId = route.params.get('eventId');
      return <EditEvent eventId={eventId} />;
    }
    if (route.path === 'create-events') {
      return <CreateEvent/>;
    }
    if (route.path === 'search') {
      return <SearchPage />;
    }
    return <NotFound />;
  };

  if (isAuthorizing) return null;
  if (networkError) {
    return (
    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.heading}>
      Sorry there seems to have been a network error. Try again later!
    </Typography>
    );
  }
  return (
  <ThemeProvider theme={theme}>
    <UserContext.Provider value={{ token, route, handleSignIn, handleSignOut, isLoading, loading }}>
      <Header/>
      {renderPage()}
    </UserContext.Provider>
  </ThemeProvider>
  );
}
