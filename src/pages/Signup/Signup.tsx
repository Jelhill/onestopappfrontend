import React, { Fragment, useState, ChangeEvent } from 'react';
import { Container, Grid, Button, Box, TextField, Typography, Checkbox, Link, Alert } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { Navbar } from '../../components/navbar';
import { signup } from '../../redux/features/user/userSlice';
import { useAppDispatch } from '../../redux/hooks';

const Signup: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isStrongPassword = (password: string): boolean => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(password);

    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, fn: React.Dispatch<React.SetStateAction<string>>): void => {
    setError("");
    fn(e.target.value);
  }

  const dispatch = useAppDispatch();

  const handleSignup = async (): Promise<void> => {
    if (!email || !password || !firstname || !lastname) {
      setError('All fields are required.');
      return;
    }
  
    if (!isStrongPassword(password)) {
      setError('Password must be strong.');
      return;
    }
  
    try {
      const signupAction = await dispatch(signup({ 
        firstname, 
        lastname,
        email, 
        password,
        phone,
      }));

      if (signupAction.type === 'user/signup/fulfilled') {
        setSuccessMessage('Signup successful! You can now log in.');
        setTimeout(() => {
          navigate('/login');
        }, 2000); 
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <Box sx={{ background: 'linear-gradient(45deg, #cfbcdf, #c7ebf0)', width: "100%" }}>
        <Container>
          <Grid container sx={{ height: "100vh", alignItems: "center", justifyContent: "center" }}>
            <Grid item xs={12} sm={12} md={5} lg={4} sx={{ background: "white", boxShadow: 3, borderRadius: 3, p: 3, width: "100%" }}>
              <Typography variant="h4" pb={5} color="initial" align="center" fontWeight="bold">
                Sign up
              </Typography>
              {/* <Typography pb={5} color="initial" align="center">
                {error ? <Alert severity="error">{error}</Alert> : null}
              </Typography> */}
              <Typography pb={5} color="initial" align="center">
              {error ? <Alert severity="error">{error}</Alert> : null}
              {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}
            </Typography>

              <Box>
                <TextField
                  id="outlined-basic"
                  label="Firstname"
                  variant="outlined"
                  fullWidth
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setFirstname)} />
              </Box>
              <Box my={3}>
                <TextField
                  id="outlined-basic"
                  label="LastName"
                  variant="outlined"
                  fullWidth
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setLastname)} />

              </Box>
              <Box>
                <TextField
                  id="outlined-basic"
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setEmail)} />
              </Box>
              <Box my={3}>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setPhone)} />
              </Box>
              <Box my={3} >
                <TextField type="password"
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setPassword)} />
              </Box>
              <Box sx={{ background: '#0288d1', color: '#fff', p: 0.4, borderRadius: '4px' }}>
                <Button fullWidth sx={{ color: "white" }} onClick={handleSignup}>Register</Button>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box display="flex">
                  <p>Already Registered? <Link href="/login">Login</Link></p>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 3 }}>
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
  )
}

export default Signup;
