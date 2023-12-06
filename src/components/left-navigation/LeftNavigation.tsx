import React from 'react';
import { Drawer, List, ListItem, Box, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'; // Corrected the import
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

const LeftNavigation: React.FC = () => {
  // const [selectedTab] = useState<string>('dashboard');
  const navigate = useNavigate()
  type NavItem = {
    title: string;
    icon: JSX.Element;
    path: string;
  };
  
  const user = useAppSelector((state: RootState) => state?.user);

  const navItems: NavItem[] = [
    { title: 'Dashboard', icon: <DashboardIcon />, path: `/seller/dashboard/${user.user?._id}` },
    { title: 'Products', icon: <AddShoppingCartIcon />, path: '/products' },
    { title: 'Transactions', icon: <BarChartIcon />, path: '/transactions' },
    { title: 'Profile', icon: <PeopleIcon />, path: '/profile' },
    { title: 'Upload Car', icon: <PeopleIcon />, path: '/carupload' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          zIndex: 1,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <List style={{ marginTop: '150px' }}>
          {navItems.map((item) => (
            <ListItem button key={item.title} onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default LeftNavigation;
