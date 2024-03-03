import { configureStore } from '@reduxjs/toolkit';
import userReducer from './src/reducers/userReducer';
import productReducer from './src/reducers/productReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});
