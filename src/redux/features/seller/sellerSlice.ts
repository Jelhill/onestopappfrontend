// sellersSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import sellerService from '../../../service/seller/seller';
import { SellerData } from '../../../service/seller/sellerInterface';

// interface SellerState {
//     seller: SellerData;
//     status: 'idle' | 'loading' | 'succeeded' | 'failed';
//     error: string | null;
//   }
const initialState = {
    seller: null,
    error: null,
}

export const createSeller = createAsyncThunk(
  'sellers/createSeller',
  async (sellerData: SellerData, { rejectWithValue }) => {
    try {
        const response = await sellerService.createSeller(sellerData);
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

const sellersSlice = createSlice({
  name: 'sellers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSeller.pending, (state) => {
        state.error = null;
      })
      .addCase(createSeller.fulfilled, (state, action) => {
        state.seller = action.payload;
      })
    //   .addCase(createSeller.rejected, (state, action) => {
    //     state.error = action.payload || "something went wrong";
    //   });
  },
});

export default sellersSlice.reducer;
