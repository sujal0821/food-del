import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

// const url = "http://localhost:4000";
// const url = "https://food-del-backend-hjel.onrender.com";
const url = API_BASE_URL;

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async ({ itemId, token }, { rejectWithValue }) => {
    try {
      if (token) {
        const response = await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
        if (!response.data.success) {
          return rejectWithValue(response.data.message);
        }
      }
      return { itemId };
    } catch (error) {
      console.error('Add to cart error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async ({ itemId, token }, { rejectWithValue }) => {
    try {
      if (token) {
        const response = await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
        if (!response.data.success) {
          return rejectWithValue(response.data.message);
        }
      }
      return { itemId };
    } catch (error) {
      console.error('Remove from cart error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to remove item from cart');
    }
  }
);

export const getCartAsync = createAsyncThunk(
  'cart/getCartAsync',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }
      return response.data.cartData;
    } catch (error) {
      console.error('Get cart error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {},
    status: 'idle',
    error: null
  },
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload;
      if (!state.items[itemId]) {
        state.items[itemId] = 1;
      } else {
        state.items[itemId] += 1;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      if (state.items[itemId]) {
        state.items[itemId] -= 1;
      }
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const itemId = action.payload.itemId;
        if (!state.items[itemId]) {
          state.items[itemId] = 1;
        } else {
          state.items[itemId] += 1;
        }
        state.status = 'succeeded';
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        const itemId = action.payload.itemId;
        if (state.items[itemId]) {
          state.items[itemId] -= 1;
        }
        state.status = 'succeeded';
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCartAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { addToCart, removeFromCart, setCartItems } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = (state) => {
  let totalAmount = 0;
  const { items } = state.cart;
  const { list: foodList } = state.food;
  
  for (const item in items) {
    if (items[item] > 0) {
      let itemInfo = foodList.find((product) => product._id === item);
      if (itemInfo) {
        totalAmount += itemInfo.price * items[item];
      }
    }
  }
  return totalAmount;
};

export default cartSlice.reducer; 