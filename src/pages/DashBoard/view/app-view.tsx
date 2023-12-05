import React from 'react';

import { Navbar } from '../../../components/navbar';
import { LeftNavigation } from '../../../components/left-navigation';
import { RightDashboard } from '../../../components/right-dashboard';

const AppView: React.FC = () => {
  return (
    <>
      <Navbar />
      <LeftNavigation />
      <RightDashboard />
    </> 
  );
};

export default AppView;
