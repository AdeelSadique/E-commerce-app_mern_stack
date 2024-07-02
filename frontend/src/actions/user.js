import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/me`);
    return data;
  } catch (error) {
    throw Error(error.message);
  }
});
