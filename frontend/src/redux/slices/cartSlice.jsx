// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk action for adding to the cart
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (obj) => {
    // console.log(userId,proId,proName,proQty,proFinalPrice)
    // console.log(obj)
    try {
      const response = await axios.post('http://localhost:3001/api/addToCart', obj,{
        withCredentials:true
      });
      return response.data.cart; // Return the updated cart data
    } catch (error) {
      throw new Error('Error adding to cart');
    }
  }
);

// Async Thunk action for fetching the cart
export const fetchCartAsync = createAsyncThunk(
  'cart/fetchCart',
  async (id) => {
    // console.log(obj);
    try {
      const response = await axios.get(`http://localhost:3001/api/fetchCart/${id}`,{
        withCredentials:true
      });
      return response.data.cart; // Return the fetched cart data
    } catch (error) {
      throw new Error('Error fetching cart');
    }
  }
);

// Async Thunk action for removing from the cart
export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCart',
  async (obj) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/api/removeFromCart`,obj,{
        withCredentials:true
      });
      return response.data.cart; // Return the updated cart data after removal
    } catch (error) {
      throw new Error('Error removing from cart');
    }
  }
);
export const handleQtyChange = createAsyncThunk(
  'cart/qtyChange',
  async (obj) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_URL}/api/qtyChange`,obj,{
        withCredentials:true
      });
      return response.data.cart; // Return the updated cart data after removal
    } catch (error) {
      throw new Error('Error incrementing item quantity');
    }
  }
);

// Create a cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartData: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Reducers for synchronous actions (if any)
  },
  extraReducers: (builder) => {
    // Handle addToCartAsync
    builder.addCase(addToCartAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.cartData = action.payload;
    });
    builder.addCase(addToCartAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Handle fetchCartAsync
    builder.addCase(fetchCartAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.cartData = action.payload;
    });
    builder.addCase(fetchCartAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Handle removeFromCartAsync
    builder.addCase(removeFromCartAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeFromCartAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.cartData = action.payload;
    });
    builder.addCase(removeFromCartAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // Handle qtychnage
    builder.addCase(handleQtyChange.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleQtyChange.fulfilled, (state, action) => {
      state.loading = false;
      state.cartData = action.payload;
    });
    builder.addCase(handleQtyChange.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default cartSlice.reducer;
