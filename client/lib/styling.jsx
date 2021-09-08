import React from 'react';
import { createTheme } from '@material-ui/core/styles';
import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';

export default function themeStyleWrapper({ children }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#3D5467'
      },
      secondary: {
        main: '#8AA29E'
      }
    }
  });

  const styles = makeStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      { children }
    </ThemeProvider>
  );
}
