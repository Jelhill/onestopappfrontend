import { configureStore } from '@reduxjs/toolkit';
import carsReducer from '../features/cars/carSlice';
import userReducer from '../features/user/userSlice';
import sellerReducer from '../features/seller/sellerSlice';
import transactionReducer from '../features/transaction/transactionSlice';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    user: userReducer,
    seller: sellerReducer, 
    transactions: transactionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
