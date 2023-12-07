import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { fetchCartItems, removeFromCart } from '../../redux/features/cart/cartSlice';
import { RootState } from '../../redux/store';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Navbar } from '../../components/navbar';
// import { selectIsAuthenticated } from '../../redux/features/auth/authSlice';
// import { isAuthenticated } from '../../utils/auth';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    console.log("Triggered")
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat().format(price)
  }
  const totalCost = cartItems.reduce((total, item) => total + item.priceAtTimeOfAddition, 0);

  return (
    <>
      <Navbar />
      <Box padding={3} key={cartItems.length}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item?.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <img src={item?.car?.imageIds[0]} alt={`${item?.car?.make} ${item?.car?.model}`} style={{ height: '80px', marginRight: '16px' }} />
                      <Typography>{`${item?.car?.make} ${item?.car?.model}`}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">${formatPrice(item?.priceAtTimeOfAddition)}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleRemoveFromCart(item?.car?._id)}>Remove</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="flex-end" marginTop={2}>
          <Typography variant="h5">
            Total: {formatPrice(totalCost)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end" marginTop={2}>
          <Button variant="contained" color="primary">Checkout</Button>
        </Box>
      </Box>
    </>
  );
};

export default CartPage;
