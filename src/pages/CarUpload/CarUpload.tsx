import React, { useState, ChangeEvent, Fragment } from 'react';
import { Container, Button, Box, TextField, Typography, Alert, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Navbar } from '../../components/navbar';
import { useAppDispatch } from '../../redux/hooks';
import { uploadCar } from '../../redux/features/cars/carSlice';
import { LeftNavigation } from '../../components/left-navigation';
import CircularProgress from '@mui/material/CircularProgress';


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
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    image: null,
  });
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const carMakes = ['Toyota', 'Ford', 'Honda', 'BMW', 'Audi'];

interface CarModels {
  [key: string]: string[];
}

const carModels: CarModels = {
  Toyota: ['Corolla', 'Camry', 'RAV4', 'Highlander'],
  Ford: ['Focus', 'Fiesta', 'Mustang', 'Explorer'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5'],
  Audi: ['A4', 'A6', 'Q5', 'Q7'],
};
const validateFormData = (): string | null => {
  if (!formData.make) return 'Make is required.';
  if (!formData.model) return 'Model is required.';
  if (!formData.year) return 'Year is required.';
  if (!formData.price) return 'Price is required.';
  
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


  const handleMakeChange = (event: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      make: event.target.value as string,
      model: '', // Reset model when make changes
    });
  };

const handleModelChange = (event: SelectChangeEvent<string>) => {
  setFormData({
    ...formData,
    model: event.target.value as string,
  });
};


const handleSelectChange = (event: SelectChangeEvent<string>) => {
  const { name, value } = event.target;
  setFormData(prevFormData => ({
    ...prevFormData,
    [name]: value
  }));
};

const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setFormData(prevFormData => ({
    ...prevFormData,
    [name]: value
  }));
};
  const handleSubmit = async (): Promise<void> => {
    const validationError = validateFormData();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

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
            image: null,
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
<Fragment>
    <Navbar />
    <LeftNavigation />
  <Container maxWidth="md">
    <Typography variant="h4" pb={5} align="center" fontWeight="bold" marginTop={12}>
      Upload Car
    </Typography>
    <Typography pb={5} align="center">
      {error ? <Alert severity="error">{error}</Alert> : null}
      {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}
    </Typography>

    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Make</InputLabel>
          <Select
            value={formData.make}
            label="Make"
            onChange={handleMakeChange}
          >
            {carMakes.map((make) => (
              <MenuItem key={make} value={make}>{make}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Model</InputLabel>
          <Select
            value={formData.model}
            label="Model"
            onChange={handleModelChange}
            disabled={!formData.make}
          >
            {formData.make && carModels[formData.make].map((model) => (
              <MenuItem key={model} value={model}>{model}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="year"
          label="Year"
          type="number"
          value={formData.year}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="price"
          label="Price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="engine"
          label="Engine"
          value={formData.engine}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="color"
          label="Color"
          value={formData.color}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin='normal'>
          <InputLabel id="fuel-type-label">Fuel Type</InputLabel>
          <Select
            labelId="fuel-type-label"
            id="fuel-type-select"
            name="fuelType"
            value={formData.fuelType}
            label="Fuel Type"
            onChange={handleSelectChange}
          >
            <MenuItem value="Petrol">Petrol</MenuItem>
            <MenuItem value="Diesel">Diesel</MenuItem>
            <MenuItem value="Electric">Electric</MenuItem>
            <MenuItem value="Hybrid">Hybrid</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin='normal'>
          <InputLabel id="transmission-label">Transmission</InputLabel>
          <Select
            labelId="transmission-label"
            id="transmission-select"
            name="transmission"
            value={formData.transmission}
            label="Transmission"
            onChange={handleSelectChange}
          >
            <MenuItem value="Automatic">Automatic</MenuItem>
            <MenuItem value="Manual">Manual</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="condition"
          label="Condition"
          value={formData.condition}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="features"
          label="Features (comma-separated)"
          value={formData.features}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleInputChange}
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
    <Button variant="contained" onClick={handleSubmit} fullWidth disabled={isLoading}>
      {isLoading ? <CircularProgress size={24} /> : 'Upload Car'}
    </Button>
  </Box>
    </Container>
    </Fragment>
  );
}

export default CarUpload;
