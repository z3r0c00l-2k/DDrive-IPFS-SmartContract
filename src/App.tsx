import HomePage from './pages/HomePage';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createCustomTheme from './theme';
import { createContext, useMemo, useState, VFC } from 'react';
import { PaletteMode } from '@mui/material';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App: VFC = () => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        );
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createCustomTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HomePage />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
