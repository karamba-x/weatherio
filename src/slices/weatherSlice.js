import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  isOpenSearch: false,
  tempC: true,
  data: null,
  loading: true,
  error: null
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${lat},${lon}&days=3`
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

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setTempC: (state) => {
      state.tempC = !state.tempC;
    },
    setIsOpenSearch: (state) => {
      state.isOpenSearch = !state.isOpenSearch;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setTempC, setIsOpenSearch } = weatherSlice.actions;
export default weatherSlice.reducer;
