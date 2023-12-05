import React, { useState } from 'react';
import { Drawer, List, ListItem, Box, Typography, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'; // Corrected the import
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';

const LeftNavigation: React.FC = () => {
  const [selectedTab] = useState<string>('dashboard');
  const navigate = useNavigate()
  type NavItem = {
    title: string;
    icon: JSX.Element;
    path: string;
  };
  
  const navItems: NavItem[] = [
    { title: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { title: 'Products', icon: <AddShoppingCartIcon />, path: '/products' },
    { title: 'Transactions', icon: <BarChartIcon />, path: '/transactions' },
    { title: 'Profile', icon: <PeopleIcon />, path: '/profile' },
    { title: 'Upload Car', icon: <PeopleIcon />, path: '/carupload' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const renderMainContent = () => {
    switch (selectedTab) {
      case 'dashboard':
        return <Typography>Dashboard Content</Typography>;
      case 'products':
        return <Typography>Products Content</Typography>;
      case 'transactions':
        return <Typography>Transaction History Content</Typography>;
      case 'profile':
        return <Typography>Profile Content</Typography>;
      default:
        return <Typography>Select a category</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240, // Adjust the width as needed
          flexShrink: 0,
          zIndex: 1000, // This ensures that the drawer will be under other content
          '& .MuiDrawer-paper': {
            width: 240, // Match the width
            boxSizing: 'border-box',
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.title} onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {renderMainContent()}
      </Box>
    </Box>
  );
}

export default LeftNavigation;
