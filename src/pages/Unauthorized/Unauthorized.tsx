// src/components/Unauthorized.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';
import { Navbar } from '../../components/navbar';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <>
    <Navbar />
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '150px' }}>
      <Box my={5}>
        <Typography variant="h4" gutterBottom>
          403 - Access Denied
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Sorry, you do not have permission to access this page.
        </Typography>
        <Button variant="contained" color="primary" onClick={goToHomePage}>
          Go Back
        </Button>
      </Box>
    </Container>
    </>
  );
};

export default Unauthorized;
