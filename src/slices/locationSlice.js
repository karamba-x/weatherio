import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  data: null,
  loading: false,
  error: null
};

export const fetchIp = createAsyncThunk(
  'location/fetchWeather',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1//ip.json?key=${import.meta.env.VITE_API_KEY}&q=auto:ip`
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        toast.error('No internet connection. Please check your network.');
      } else {
        toast.error(
          `Error: ${error.response.data.message || 'Something went wrong!'}`
        );
      }
      return rejectWithValue(
        error.response
          ? error.response.data
          : { message: 'No internet connection.' }
      );
    }
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchIp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchIp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default locationSlice.reducer;
