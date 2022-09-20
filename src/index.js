import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import productReducer from './features/productSlice';
import cartReducer from './features/cartSlice'

import { productsApi } from './features/productsApi'

const store = configureStore({
  reducer: {
    // product: productReducer, 
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware)
  }
})

// store.dispatch(fetchProducts())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

