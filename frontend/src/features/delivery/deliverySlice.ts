import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  ErrorType,
  IDeliveryState,
  Delivery,
  State,
  LoggedInUser,
  DeliveryArray,
} from '../../types.ts';
import deliveryService from './deliveryService';
import moment from 'moment';

const initialState: IDeliveryState = {
  deliveries: { deliveries: [] },
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

// create delivery
export const createDelivery = createAsyncThunk(
  'delivery/create',
  async (deliveryData: Delivery, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as State;
      const { token } = state.auth.user;
      const delivery: Delivery = await deliveryService.createDelivery(deliveryData, token);
      return delivery;
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else if (typeof error === 'string') message = error.toString();
      else
        message = (error: ErrorType) =>
          error.response && error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get user deliveries
export const getDeliveries = createAsyncThunk('delivery/getAll', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as State;
    const { token } = state.auth.user;
    const deliveryArray: DeliveryArray = await deliveryService.getDeliveries(token);
    return deliveryArray;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else if (typeof error === 'string') message = error.toString();
    else
      message = (error: ErrorType) =>
        error.response && error.response.data && error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const deliverySlice = createSlice({
  /* eslint-disable no-param-reassign */
  name: 'delivery',
  initialState,
  reducers: {
    reset: (state: IDeliveryState) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDelivery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDelivery.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        deliveries: { deliveries: [...state.deliveries.deliveries, payload] as Delivery[] },
      }))
      .addCase(createDelivery.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        typeof action.payload === 'string'
          ? (state.errorMessage = action.payload)
          : (state.errorMessage = JSON.stringify(action.payload));
      })
      .addCase(getDeliveries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDeliveries.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        const deliveries: Delivery[] = payload.deliveries.map((delivery) => ({
          ...delivery,
          createdAt: delivery.createdAt
            ? moment.utc(delivery.createdAt).format('DD/MM/YYYY HH:mm:ss')
            : delivery.createdAt,
          updatedAt: delivery.updatedAt
            ? moment.utc(delivery.updatedAt).format('DD/MM/YYYY HH:mm:ss')
            : delivery.updatedAt,
          deliveryDate: delivery.deliveryDate
            ? moment(delivery.deliveryDate).format('DD/MM/YYYY')
            : delivery.deliveryDate,
        }));
        state.deliveries = { deliveries };
      })
      .addCase(getDeliveries.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        typeof action.payload === 'string'
          ? (state.errorMessage = action.payload)
          : (state.errorMessage = JSON.stringify(action.payload));
      });
  },
  /* eslint-enable no-param-reassign */
});

export const { reset } = deliverySlice.actions;
export default deliverySlice.reducer;
