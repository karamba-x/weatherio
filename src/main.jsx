import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './slices/index.js';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const store = configureStore({
  reducer
});

export default store;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer theme="dark" />
    </Provider>
  </React.StrictMode>
);
