import { createSlice } from '@reduxjs/toolkit';
import { getAllProducts } from '../actions/products';
import { deleteProduct } from '../actions/products';

const initialState = {
  loading: false,
  failed: null,
  productCounts: null,
  data: [],
};
export const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.products;
        state.productCounts = action.payload.productCounts;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.failed = action.payload;
      });
  },
});

// export const { isSuccess, isFailed, isLoading } = userSlice.actions;
export default productSlice.reducer;
