import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

import './index.css';

import App from './App/App';
import AppStateProvider from './context/app-state/AppStateProvider';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </ThemeProvider>
  </StrictMode>
);
