import React, { useState } from 'react';
import CreateEvent from './pages/create-event-page.jsx';
import Home from './pages/home.jsx';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';
import Header from './components/toolbar';
import parseRoute from './lib/parse-route.js';
import NotFound from './pages/not-found.jsx';
import EventDetails from './pages/event-details.jsx';

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

  window.addEventListener('hashchange', () => {
    setRoute(parseRoute(window.location.hash));
  });

  const renderPage = () => {
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'events') {
      const eventId = route.params.get('eventId');
      return <EventDetails eventId={eventId}/>;
    }
    if (route.path === 'create-events') {
      return <CreateEvent />;
    }
    return <NotFound />;
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      {renderPage()}
    </ThemeProvider>
  );
}
