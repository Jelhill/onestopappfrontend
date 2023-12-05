import React, { useState, ChangeEvent, Fragment } from 'react';
import { Container, Button, Box, TextField, Typography, Alert, Grid } from "@mui/material";
import { Navbar } from '../../components/navbar';
import { useAppDispatch } from '../../redux/hooks';
import { uploadCar } from '../../redux/features/cars/carSlice';


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
  image: File | null
}

  
const CarUpload: React.FC = () => {
  const dispatch = useAppDispatch();
  const [fileName, setFileName] = useState<string>('');
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateFormData = (): string | null => {
    // Check for required fields
    if (!formData.make) return 'Make is required.';
    if (!formData.model) return 'Model is required.';
    if (!formData.year) return 'Year is required.';
    if (!formData.price) return 'Price is required.';
    
    // Additional validation rules...
    if (parseInt(formData.year) < 1900 || parseInt(formData.year) > new Date().getFullYear()) {
      return 'Please enter a valid year.';
    }
    if (parseFloat(formData.price) <= 0) {
      return 'Please enter a valid price.';
    }
    if (formData.features && !formData.features.split(',').every(feature => feature.trim() !== '')) {
      return 'Please enter valid features.';
    }
    if (!formData.image) {
      return 'Image is required.';
    } else {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(formData.image.type)) {
        return 'Invalid image type. Allowed types are JPEG, PNG, GIF.';
      }
  
      const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
      if (formData.image.size > maxFileSize) {
        return 'Image is too large. Maximum size is 5MB.';
      }
    }
    return null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSuccessMessage("");
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSuccessMessage("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prevFormData => ({
        ...prevFormData,
        image: file
      }));
      setFileName(file.name);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const validationError = validateFormData();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof CarFormData];
      
        if (key === 'features' && typeof value === 'string') {
          value.split(',').forEach(feature => {
            formDataToSend.append('features', feature.trim());
          });
        } else if (key === 'image' && value instanceof File) {
          formDataToSend.append(key, value);
        } else if (typeof value === 'string') {
          formDataToSend.append(key, value);
        }
      });
      

      dispatch(uploadCar(formDataToSend)).unwrap()
        .then(response => {
          setSuccessMessage('Car data uploaded successfully');
          console.log('Car data uploaded successfully:', response);
          setFormData({
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
          setFileName('');
        })
        .catch(uploadError => {
          setError('Failed to upload car data. Please try again.');
          console.error('Upload error:', uploadError);
        });

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
      {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}
    </Typography>

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
      </Grid>

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
        <TextField
          name="condition"
          label="Condition"
          value={formData.condition}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="features"
          label="Features (comma-separated)"
          value={formData.features}
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
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
      <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ justifyContent: "start" }}
        >
          Upload Image
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            accept="image/*"
          />
        </Button>
        {fileName && <Typography>{fileName}</Typography>}
      </Grid>
    </Grid>

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
