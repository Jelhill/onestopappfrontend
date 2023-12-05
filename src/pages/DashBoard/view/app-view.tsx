import React from 'react';

import { Navbar } from '../../../components/navbar';
import { LeftNavigation } from '../../../components/left-navigation';
import { RightDashboard } from '../../../components/right-dashboard';
import { Box } from '@mui/material';

const AppView: React.FC = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', height: 'calc(100vh - 100px)' }}> {/* Adjust the height to subtract the Navbar height */}
        <LeftNavigation />
        <RightDashboard />
      </Box>
    </>
  );
};

export default AppView;
