import React from 'react';

import { Navbar } from '../../../components/navbar';
import { LeftNavigation } from '../../../components/left-navigation';
import { RightDashboard } from '../../../components/right-dashboard';
import { Box } from '@mui/material';

const AppView: React.FC = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <LeftNavigation />
        <RightDashboard />
      </Box>
    </> 
  );
};

export default AppView;
