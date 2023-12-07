import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
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

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async () => {
    const response = await CarService.getAllCars();
    return response;
  }
);

export const fetchCarsBySeller = createAsyncThunk(
  'cars/fetchCarsBySeller',
  async (sellerId: string, { rejectWithValue }) => {
    try {
      const response = await CarService.getAllCarsBySellerId(sellerId);
      return response?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

export const uploadCar = createAsyncThunk(
  'cars/uploadCar',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await CarService.uploadCarData(formData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }    
    }
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
      })
      .addCase(fetchCarsBySeller.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCarsBySeller.fulfilled, (state, action: PayloadAction<Car[] | undefined>) => {
        state.status = 'succeeded';
        state.cars = action.payload || [];
      })
      .addCase(fetchCarsBySeller.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong fetching cars by seller';
      })
  },
});

export default carsSlice.reducer;
  