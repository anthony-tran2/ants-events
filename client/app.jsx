import React, { useState, useEffect } from 'react';
import CreateEvent from './pages/create-event-page.jsx';
import Home from './pages/home.jsx';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';
import Header from './components/toolbar';
import parseRoute from './lib/parse-route.js';
import NotFound from './pages/not-found.jsx';
import EventDetails from './pages/event-details.jsx';
import SearchPage from './pages/search.jsx';

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

export default function App() {
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [prevRoute, setPrevRoute] = useState('');

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setRoute(parseRoute(window.location.hash));
    });
  }, []);

  useEffect(() => {
    if (route.path === '') setPrevRoute('#');
    if (route.path === 'search') setPrevRoute('#search');
  }, [route]);

  const renderPage = () => {
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'events') {
      const eventId = route.params.get('eventId');
      return <EventDetails hash={prevRoute} eventId={eventId}/>;
    }
    if (route.path === 'create-events') {
      return <CreateEvent />;
    }
    if (route.path === 'search') {
      return <SearchPage />;
    }
    return <NotFound />;
  };

  return (
    <ThemeProvider theme={theme}>
      <Header route={route.path} />
      {renderPage()}
    </ThemeProvider>
  );
}
