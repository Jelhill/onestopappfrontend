import { configureStore } from '@reduxjs/toolkit';
import carsReducer from '../features/cars/carSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
