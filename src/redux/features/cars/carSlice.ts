import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CarData } from '../../../service/cars/carInterfaces';
import CarService from '../../../service/cars/cars';
import { Car } from '../../../service/cars/cars';

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

export const uploadCar = createAsyncThunk(
  'cars/uploadCar',
  async (carData: CarData, { rejectWithValue }) => {
    try {
      const response = await CarService.uploadCarData(carData); // carService is a class with a method to handle the API call
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }    }
  }
)

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
  