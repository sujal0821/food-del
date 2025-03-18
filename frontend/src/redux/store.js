import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import foodReducer from './slices/foodSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    food: foodReducer,
    auth: authReducer,
  },
});

export default store;
