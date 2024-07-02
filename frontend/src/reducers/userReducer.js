import { createSlice } from '@reduxjs/toolkit';
import { getUser } from '../actions/user';
import { getAllProducts } from '../actions/products';

const initialState = {
  loading: false,
  failed: null,
  data: {},
};
export const userSlice = createSlice({
  name: 'user',
  initialState,

  // reducers: {
  //   isSuccess: (state, action) => {
  //     state.loading = false;
  //     state.data = action.payload;
  //   },
  //   isLoading: (state, action) => {
  //     state.loading = true;
  //   },
  //   isFailed: (state, action) => {
  //     state.loading = false;
  //     state.failed = action.payload;
  //   },
  // },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.failed = action.payload;
      })
      .addCase('deleteUser', (state, action) => {
        state.data = {};
      });
  },
});

// export const { isSuccess, isFailed, isLoading } = userSlice.actions;
export default userSlice.reducer;
