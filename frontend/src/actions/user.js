import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    const { data } = await axios.get('http://localhost:4000/api/me', { withCredentials: true });
    return data;
  } catch (error) {
    throw Error(error.message);
  }
});
