import React, { Fragment, useState } from 'react';
import { Container, Grid, Button, Box, TextField, Typography, Checkbox, Link, Alert } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import { Navbar } from '../../components/navbar';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login } from '../../redux/features/user/userSlice';
import { RootState } from '../../redux/store';
import { setAuthenticated } from '../../redux/features/auth/authSlice';

const Login: React.FC = () => {
  console.log("Login mounting")
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const location = useLocation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const user = useAppSelector((state: RootState) => state?.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fn: React.Dispatch<React.SetStateAction<string>>) => {
    setError("");
    setSuccessMessage("");
    fn(e.target.value);
  };

  const handleLogin = async () => {
    setError("");
    setSuccessMessage("");

    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }
  
    try {
      const loginAction = await dispatch(login({ email, password }));
      
      if (loginAction.type === 'user/login/fulfilled') {
        setSuccessMessage("Success");
        dispatch(setAuthenticated(true));
        setTimeout(() => {
          console.log(user.user)
          if(user.user?.isSeller) {
            navigate(`/seller/dashboard/${user.user?._id}`);
            return
          }
          navigate("/");

        }, 2000);

      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <Fragment>
        <Navbar />
       <Box sx={{background: 'linear-gradient(45deg, #cfbcdf, #c7ebf0)', width: "100%"}}>
        <Container>
          <Grid container  sx={{height: "100vh", alignItems: "center", justifyContent: "center",  }}>
            <Grid item xs={12} sm={12} md={5} lg={4} sx={{background: "white",boxShadow: 3, borderRadius: 3, p:3, width: "100%" }}>
              <Typography variant="h4" pb={5} color="initial" align="center" fontWeight="bold">
                Login
              </Typography>
              <Typography pb={5} color="initial" align="center">
                {error ? <Alert severity="error">{error}</Alert> : null}
                {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}
              </Typography>
              <Box>
                <TextField 
                  type="email"
                  id="outlined-basic" 
                  label="Email" 
                  variant="outlined" fullWidth 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setEmail)}
                  />
              </Box>
              <Box my={3} >
              <TextField 
                type="password"
                id="outlined-basic" 
                label="Password" variant="outlined" 
                fullWidth 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, setPassword)}

                />
              </Box>
              <Box sx={{ background: '#0288d1', color: '#fff', p: 0.4, borderRadius: '4px'}}>
              <Button fullWidth sx={{color: "white", }} onClick={handleLogin}>Login</Button>
              </Box>
              <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <Box display="flex">
                  <p>Not yet registered? <Link href="/signup">Signup</Link></p>
                </Box>
              </Box>
              <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", mt:3}}>
                <Box display="flex">
                  <Checkbox defaultChecked />
                  <p>Remember me</p>
                </Box>
                <Box>
                  <p>Forgot Password</p>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
};

export default Login;
