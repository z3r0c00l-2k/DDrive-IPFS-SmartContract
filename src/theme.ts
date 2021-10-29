import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#311b92',
      light: '#6746c3',
      dark: '#000063',
    },
    secondary: {
      main: '#004d40',
      light: '#39796b',
      dark: '#00251a',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ['Ubuntu'].join(','),
  },
});

export default theme;
