import { useEffect, useState } from 'react';
import './App.css';
import { Box, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import routes from './routes';
import { AppContent } from './pages/AppContent';
import theme from './assets/theme';
import { useAppDispatch } from './redux/hooks';
import { isAuthenticated } from './utils/auth';
import { setAuthenticated } from './redux/features/auth/authSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchCartItems } from './redux/features/cart/cartSlice';
import { fetchCars } from './redux/features/cars/carSlice';

function App() {
  const dispatch = useAppDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = isAuthenticated();
      dispatch(setAuthenticated(isAuth));
      if (isAuth) {
        dispatch(fetchCartItems());
        dispatch(fetchCars());
      }
      setIsAuthChecked(true);
    };
  
    checkAuth();
  }, [dispatch]);
  
  if (!isAuthChecked) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <AppContent routes={routes} />
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
