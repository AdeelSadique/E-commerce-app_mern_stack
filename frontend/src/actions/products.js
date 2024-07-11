import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const getAllProducts = createAsyncThunk('product/getAllProducts', async (url, thunkApi) => {
  try {
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  } catch (error) {
    throw Error(error.message);
    // return error.message;
  }
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id, thunkApi) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`, { withCredentials: true });
    return '';
  } catch (error) {
    throw Error(error.message);
    // return error.message;
  }
});
