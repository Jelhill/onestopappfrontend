import * as React from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { clearUser, fetchUserData } from '../../redux/features/user/userSlice';
import { setAuthenticated } from '../../redux/features/auth/authSlice';
import Badge from '@mui/material/Badge';
import { isAuthenticated } from '../../utils/auth';
import Logo from "../../assets/images/logo1.jpeg"
const pages: string[] = ['Products', 'Pricing', 'Blog'];
let settings: string[] = ['Profile', 'Account', 'Dashboard', 'Logout'];
const authPages: string[] = ['Login', 'Signup'];

const ResponsiveAppBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userToken = localStorage.getItem('token');
  const user = useSelector((state: RootState) => state?.user);
  const cartItems = useSelector((state: RootState) => state.cart.items); // Assuming you have a cart slice with items

  if(!user.user?.isSeller) {
    settings = ['Profile', 'Account', 'Logout']
  } else {
    settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    if (userToken) {
      dispatch(fetchUserData(userToken));
    }
  }, [userToken, dispatch]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: string) => {
    if(setting === "Logout") {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      dispatch(clearUser())
      dispatch(setAuthenticated(false));
      navigate("/")
    }

    if(setting === "Dashboard") {
      navigate(`/seller/dashboard/${user.user?._id}`)
    }
    setAnchorElUser(null);
  };

  const handleNavigate = (page: string) => {
    const route = page.toLowerCase();
    navigate(`/${route}`);
  };

  return (
    <AppBar position="fixed" sx={{ width: '100%' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button onClick={() => navigate("/")}><Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            <img src={Logo} style={{height: "50px", width: "50px"}}/>
          </Typography></Button>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={Logo} style={{height: "50px", width: "50px"}}/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          { isAuthenticated() ?
          <IconButton color="inherit" onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton> : null }

            {!userToken ? authPages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigate(page)}
                sx={{ my: 2, color: 'white' }}
              >
                {page}
              </Button>
            )) 
            : 
            <>{ 
              !user.user?.isSeller && 
                <Button sx={{ my: 2, color: 'white' }} onClick={() => navigate("/createseller")} >
                  {`Become A seller` }
                </Button> }

            <Button sx={{ my: 2, color: 'white' }} >
             {`${user.user?.firstName} ${user.user?.lastName}` }
           </Button></>
          }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            { userToken ? <Tooltip title="Open settings">
             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* Display user's name if available */}
                {userToken && userToken !== 'undefined' && user.user?.firstName ? (
                  <Avatar alt="User" src="/static/images/avatar/2.jpg">
                    {user.user?.firstName[0]}
                  </Avatar>
                ) : (
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                )}
              </IconButton>
            </Tooltip> : null }
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
