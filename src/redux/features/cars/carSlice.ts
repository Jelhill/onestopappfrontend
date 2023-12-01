import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import CarService from '../../../service/cars';
import { Car } from '../../../service/cars';

interface CarState {
  cars: Car[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CarState = {
  cars: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching cars
export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async () => {
    const response = await CarService.getAllCars();
    return response?.data;
  }
);

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
        state.status = 'succeeded';
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default carsSlice.reducer;
  