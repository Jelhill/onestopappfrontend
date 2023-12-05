import React, { useState, ChangeEvent, Fragment } from 'react';
import { Container, Button, Box, TextField, Typography, Alert, Grid } from "@mui/material";
import { Navbar } from '../../components/navbar';
import { useAppDispatch } from '../../redux/hooks';
import { createSeller } from '../../redux/features/seller/sellerSlice';
import { useNavigate } from 'react-router-dom';

interface SellerFormData {
  companyName: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  contactDetails: {
    phone: string;
    email: string;
  };
}

const CreateSeller: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [formData, setFormData] = useState<SellerFormData>({
    companyName: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    contactDetails: {
      phone: '',
      email: '',
    },
  });
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSuccessMessage("")
    const { name, value } = e.target;
  
    // Split the field name into parts based on '.'
    const fieldParts = name.split('.');
    const updatedFormData = { ...formData };
  
    // Traverse the nested structure to update the field
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentLevel: any = updatedFormData; // Use any type assertion here
    for (let i = 0; i < fieldParts.length - 1; i++) {
      const part = fieldParts[i];
      if (!currentLevel[part]) {
        currentLevel[part] = {};
      }
      currentLevel = currentLevel[part];
    }
  
    // Set the value for the field
    currentLevel[fieldParts[fieldParts.length - 1]] = value;
  
    setFormData(updatedFormData);
  };

  const handleSubmit = async (): Promise<void> => {
    const { companyName, address, contactDetails } = formData;
    if (!companyName || !address.street || !address.city || !address.state || !address.postalCode || !address.country || !contactDetails.phone || !contactDetails.email) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await dispatch(createSeller(formData));
      if (createSeller.fulfilled.match(response)) {
        setSuccessMessage('Seller created successfully.');
        console.log('Seller data uploaded successfully:');
        navigate("/seller/dashboard")
      } else {
        setError('Failed to create seller. Please try again.');
      }    } catch (error) {
      setError('Failed to create seller. Please try again.');
      console.error('Create seller error:', error);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="h4" pb={5} align="center" fontWeight="bold">
          Signup as a Seller
        </Typography>
        <Typography pb={5} color="initial" align="center">
              {error ? <Alert severity="error">{error}</Alert> : null}
              {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}
          </Typography>

        {/* Grid container to hold form fields */}
        <Grid container spacing={3}>
          {/* Left column */}
          <Grid item xs={12}>
            <TextField
              name="companyName"
              label="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="address.street"
              label="Street"
              value={formData.address.street}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="address.city"
              label="City"
              value={formData.address.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="address.state"
              label="State"
              value={formData.address.state}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="address.postalCode"
              label="Postal Code"
              value={formData.address.postalCode}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="contactDetails.phone"
              label="Phone"
              value={formData.contactDetails.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="contactDetails.email"
              label="Email"
              type="email"
              value={formData.contactDetails.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="address.country"
              label="Country"
              value={formData.address.country}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Box my={3}>
          <Button variant="contained" onClick={handleSubmit} fullWidth>
            Sign up
          </Button>
        </Box>
      </Container>
    </Fragment>
  );
};

export default CreateSeller;
