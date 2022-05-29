import React, { useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCookies } from 'react-cookie';

const Theme = ({ children }) => {
  const [cookies] = useCookies(['darkMode']);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: 'rgb(0, 30, 60)',
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const [themePref, setThemePref] = useState(lightTheme);

  useEffect(() => {
    setThemePref(cookies.darkMode === 'true' ? darkTheme : lightTheme);
  }, [cookies]);

  return (
    <ThemeProvider theme={themePref}>
      <StyledThemeProvider theme={themePref}>{children}</StyledThemeProvider>
    </ThemeProvider>
  );
};

export default Theme;
