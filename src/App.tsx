import './App.css'
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import routes from './routes';
import { AppContent } from './views/AppContent';
import theme from './assets/theme';

function App() {
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
