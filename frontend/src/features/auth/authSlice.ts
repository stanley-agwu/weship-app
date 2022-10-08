import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType, LoggedInUser, IRegisterUser } from '../../types.ts';
import authService from './authService';

// Get user from localStorage
const user: LoggedInUser = JSON.parse(localStorage.getItem('user')!);

const initialState = {
  user: user || null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  errorMessage: '',
}

// Register user
export const register = createAsyncThunk('auth/register',
  async (user: IRegisterUser, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message
      else if (typeof error === 'string') message = error.toString();
      else message = (error: ErrorType) => error.response && error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  })

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = '';
    }
  }
})

export const { reset } = authSlice.actions;

export default authSlice.reducer;