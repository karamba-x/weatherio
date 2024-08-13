import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: {
    name: 'London',
    lat: 51.5074,
    lon: -0.1278
  },
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;