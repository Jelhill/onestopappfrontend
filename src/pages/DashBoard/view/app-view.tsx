import React from 'react';

import { Navbar } from '../../../components/navbar';
import { LeftNavigation } from '../../../components/left-navigation';
import { RightDashboard } from '../../../components/right-dashboard';
import { Box } from '@mui/material';

const AppView: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Navbar />
      <LeftNavigation />
      <RightDashboard />
    </Box>
  );
};

export default AppView;
