import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionData } from '../../../service/transactions/transactionInterface';
import transactionService from '../../../service/transactions/transactions';

interface TransactionState {
  transactions: TransactionData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  status: 'idle',
  error: null,
};

export const fetchTransactions = createAsyncThunk(
    'transaction/fetchTransactions',
    async (_, { rejectWithValue }) => {
      try {
        const response = await transactionService.getAllTransactions();
        return response;
      } catch (error) {
        return rejectWithValue('An error occurred while fetching transactions');
      }
    }
);
export const fetchTransactionsBySeller = createAsyncThunk(
    'transaction/fetchTransactionsBySeller',
    async (sellerId: string, { rejectWithValue }) => {
      try {
        const response = await transactionService.getTransactionBySellerId(sellerId);
        return response.data;
      } catch (error) {
        return rejectWithValue('An error occurred while fetching transactions');
      }
    }
);
  

  const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTransactions.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTransactions.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.transactions = action.payload;
        })
        .addCase(fetchTransactions.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload as string;
        })
        .addCase(fetchTransactionsBySeller.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTransactionsBySeller.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.transactions = action.payload;
        })
        .addCase(fetchTransactionsBySeller.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload as string;
        });
    },
  });
  
  export default transactionSlice.reducer;
  
  