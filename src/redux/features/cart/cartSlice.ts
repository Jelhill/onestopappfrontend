import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import CartService from '../../../service/cart/cart';
import { CartItem } from '../../../service/cart/cartInterface';

interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const cartItems = await CartService.getCartItems();
      return cartItems;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartItemData: { carId: string; priceAtTimeOfAddition: number }, { getState, rejectWithValue }) => {
    const { cart } = getState() as { cart: CartState };
    const isItemInCart = cart.items.some(item => item.carId === cartItemData.carId);
    
    if (isItemInCart) {
      return rejectWithValue('Item is already in the cart');
    }
    
    try {
      const addedItem = await CartService.addCartItem(cartItemData);
      return addedItem;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }    
    }
  }
);


export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId: string, { dispatch, rejectWithValue }) => {
    try {
      await CartService.deleteCartItem(itemId);
      dispatch(fetchCartItems());
      return itemId;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'idle';
        const itemId = action.payload;
        state.items = state.items.filter(item => item.id !== itemId);
      });
    
    },
});

export default cartSlice.reducer;
