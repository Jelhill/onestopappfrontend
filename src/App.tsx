import { useEffect } from 'react';
import './App.css'
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import routes from './routes';
import { AppContent } from './pages/AppContent';
import theme from './assets/theme';
import { useAppDispatch } from './redux/hooks';
import { isAuthenticated } from './utils/auth';
import { setAuthenticated } from './redux/features/auth/authSlice';

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(setAuthenticated(true));
    } else {
      dispatch(setAuthenticated(false));
    }
  }, [dispatch]);

  return (
      <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
          <Router>
              <AppContent routes={routes} />
          </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  )

}
export default App
