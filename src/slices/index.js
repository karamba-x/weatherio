import { combineReducers } from '@reduxjs/toolkit';
import weather from './weatherSlice.js';
import location from './locationSlice.js';
import search from './searchSlice.js';

export default combineReducers({
  weather,
  location,
  search
});
