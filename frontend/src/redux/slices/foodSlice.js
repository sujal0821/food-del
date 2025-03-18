import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

// const url = "http://localhost:4000";
// const url = "https://food-del-backend-hjel.onrender.com";
const url = API_BASE_URL;

export const fetchFoodList = createAsyncThunk(
  'food/fetchFoodList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {
    setFoodList: (state, action) => {
      state.list = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFoodList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchFoodList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setFoodList } = foodSlice.actions;

export const selectFoodList = (state) => state.food.list;
export const selectFoodStatus = (state) => state.food.status;

export default foodSlice.reducer; 