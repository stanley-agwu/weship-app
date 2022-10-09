import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorType, LoggedInUser, IRegisterUser, IState } from '../../types.ts';
import authService from './authService';

// Get user from localStorage
const user: LoggedInUser = JSON.parse(localStorage.getItem('user')!);

const initialState: IState = {
  user: user || null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  errorMessage: '',
}

// register user
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        typeof action.payload === 'string'
          ? state.errorMessage = action.payload
          : state.errorMessage = JSON.stringify(action.payload);
        state.user = null;
      })
  },
})

export const { reset } = authSlice.actions;

export default authSlice.reducer;