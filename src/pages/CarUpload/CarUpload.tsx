import React, { useState, ChangeEvent, Fragment } from 'react';
import { Container, Button, Box, TextField, Typography, Alert, Grid } from "@mui/material";
import axios from 'axios';
import { config } from '../../config';
import { Navbar } from '../../components/navbar';

interface CarFormData {
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  engine: string;
  color: string;
  condition: string;
  description: string;
  features: string;
  image: null
}

  
const CarUpload: React.FC = () => {
  const [formData, setFormData] = useState<CarFormData>({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    engine: '',
    color: '',
    condition: '',
    description: '',
    features: '',
    image: null
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  const handleSubmit = async (): Promise<void> => {
    const { make, model, year, price, ...otherFields } = formData;
    if (!make || !model || !year || !price) {
      setError('Make, model, year, and price fields are required.');
      return;
    }

    try {
      const payload = {
        ...otherFields,
        make,
        model,
        year: parseInt(year),
        price: parseFloat(price),
        // Assume features is a comma-separated string, convert to array
        features: formData.features.split(',').map(feature => feature.trim()),
        image: formData.image
      };

      const response = await axios.post(`${config.BASE_URL}/cars`, payload);
      console.log('Car data uploaded successfully:', response.data);
    } catch (error) {
      setError('Failed to upload car data. Please try again.');
      console.error('Upload error:', error);
    }
  };

  return (
<Fragment>
    <Navbar />
  <Container maxWidth="md">
    <Typography variant="h4" pb={5} align="center" fontWeight="bold">
      Upload Car
    </Typography>
    <Typography pb={5} align="center">
      {error ? <Alert severity="error">{error}</Alert> : null}
    </Typography>

    {/* Grid container to hold form fields */}
    <Grid container spacing={3}>
      {/* Left column */}
      <Grid item xs={12} md={6}>
        <TextField
          name="make"
          label="Make"
          value={formData.make}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="model"
          label="Model"
          value={formData.model}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="year"
          label="Year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="price"
          label="Price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* Include additional TextFields as needed */}
      </Grid>

      {/* Right column */}
      <Grid item xs={12} md={6}>
        <TextField
          name="mileage"
          label="Mileage"
          type="number"
          value={formData.mileage}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="fuelType"
          label="Fuel Type"
          value={formData.fuelType}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="transmission"
          label="Transmission"
          value={formData.transmission}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* Continue with other fields */}
        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Button
          variant="outlined" // Make it outlined to differentiate from the submit button
          component="label"
          fullWidth
          sx={{ justifyContent: "start" }}
        >
          Upload Image
          <input
            type="file"
            hidden
            // onChange={handleFileSelect}
            multiple
          />
        </Button>
      </Grid>

      {/* Submit Button */}
    </Grid>

    {/* Submit Button */}
    <Box my={3}>
      <Button variant="contained" onClick={handleSubmit} fullWidth>
        Upload Car
      </Button>
    </Box>
    </Container>
    </Fragment>
  );
}

export default CarUpload;
