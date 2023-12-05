import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import userService from '../../../service/user/user';
import { LoginData, SignupData } from '../../../service/user/userInterface';

interface UserState {
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        isDeleted: boolean;
        isSeller: boolean;
        roles: string[];
        sellerDetails: {
            address?: {
            street: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            };
            contactDetails?: {
            phone: string;
            email: string;
            };
            companyName?: string;
            _id: string;
            isActive: boolean;
        } | null;
        created: string;
        updated: string;
    } | null;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  const initialState: UserState = {
    user: null, 
    token: null,
    status: 'idle',
    error: null,
  };

  export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: LoginData, { rejectWithValue }) => {
    try {
      const response = await userService.login({email, password});
      localStorage.setItem("token", response?.data?.token)
      localStorage.setItem("user", response?.data?.user?._id)

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

export const signup = createAsyncThunk(
  'user/signup',
  async (userDetails: SignupData, { rejectWithValue }) => {
    try {
      const data = await userService.signup(userDetails);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (token: string, { rejectWithValue }) => {
      try {
        const userData = await userService.fetchUserData(token);
  
        return userData;
      } catch (error) {
        return rejectWithValue('An error occurred while fetching user data');
      }
    }
  );

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.fulfilled, (state, action) => {
        if (action.payload.user && action.payload.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.status = 'succeeded';
        } else {
          state.error = 'Login failed, no user or token returned';
          state.status = 'failed';
        }
      })
      .addCase(signup.fulfilled, (state, action) => {
        if (action.payload.user) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.status = 'succeeded';
          } else {
            state.error = 'Signup failed, no user or token returned';
            state.status = 'failed';
          }
        })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        if (action.payload?.user) {
            state.user = action.payload.user;
            state.status = 'succeeded';
        } else {
            state.error = 'Fetch user data failed, no user returned';
            state.status = 'failed';
        }
      })
    },

});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
