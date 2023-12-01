import React, { useState, ChangeEvent, Fragment } from 'react';
import { Container, Button, Box, TextField, Typography, Alert } from "@mui/material";
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
      // Handle successful upload, like redirecting to a confirmation page or clearing the form
    } catch (error) {
      setError('Failed to upload car data. Please try again.');
      console.error('Upload error:', error);
    }
  };

  // Form fields based on the Car object properties
  return (
<Fragment>
    <Navbar />
  <Container>
    <Typography variant="h4" pb={5} align="center" fontWeight="bold">
      Upload Car
    </Typography>
    <Typography pb={5} align="center">
      {error ? <Alert severity="error">{error}</Alert> : null}
    </Typography>
    {/* Form Fields */}
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
    <TextField
      name="engine"
      label="Engine"
      value={formData.engine}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
    <TextField
      name="color"
      label="Color"
      value={formData.color}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
    <TextField
      name="condition"
      label="Condition"
      value={formData.condition}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
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
    <TextField
      name="features"
      label="Features"
      value={formData.features}
      onChange={handleChange}
      fullWidth
      margin="normal"
      helperText="Separate features with commas"
    />
    <Box my={3}>
      <Button variant="contained" onClick={handleSubmit}>
        Upload Car
      </Button>
    </Box>
  </Container>
</Fragment>
  );
}

export default CarUpload;
