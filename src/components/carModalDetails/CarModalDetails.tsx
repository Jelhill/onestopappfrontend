import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Grid, Alert } from '@mui/material';
import { useAppDispatch } from '../../redux/hooks';
import { addToCart } from '../../redux/features/cart/cartSlice';

interface Car {
  _id: string
  make: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  fuelType?: string;
  transmission?: string;
  engine?: string;
  color?: string;
  condition?: string;
  description?: string;
  imageIds: string[];
}

interface CarDetailsModalProps {
  open: boolean;
  onClose: () => void;
  car: Car;
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ open, onClose, car }) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = async () => {
    const cartItemData = {
      carId: car._id,
      make: car.make,
      model: car.model,
      price: car.price,
      imageUrl: car.imageIds[0],
      priceAtTimeOfAddition: car.price
    };
    setError(null);

    try {
      dispatch(addToCart(cartItemData)).unwrap();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to add the item to the cart.');
      }    
    }
  };

  return (
    <>
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box
              component="img"
              src={car.imageIds[0]}
              alt={`${car.make} ${car.model}`}
              sx={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Roboto' }}>
              {car.make} {car.model}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Year: {car.year}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Price: ${car.price}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Mileage: {car.mileage} miles
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Fuel Type: {car.fuelType}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Transmission: {car.transmission}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Engine: {car.engine}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Color: {car.color}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Condition: {car.condition}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Description: {car.description}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
            <Button variant="contained" color="primary" onClick={() => { handleAddToCart() }}>
              Add to Cart
            </Button>
          </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
    </>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: 'calc(100vh - 96px)', // Keeps the modal within the viewport height
  overflowY: 'auto',
  width: 'auto', // Allows the modal to size width based on content
  maxWidth: '90%', // Restricts the modal's maximum width
  borderRadius: '16px', // Adds rounded corners to the modal
};


export default CarDetailsModal;
