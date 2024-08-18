import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const searchCities = createAsyncThunk(
  'cities/searchCities',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/search.json?q=${query}&key=${import.meta.env.VITE_API_KEY}`
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

const searchSlice = createSlice({
  name: 'cities',
  initialState: {
    searchResults: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default searchSlice.reducer;
