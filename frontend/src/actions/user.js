import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookie from 'js-cookie';

export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    if (Cookie.get('token')) {
      const { data } = await axios.get('http://localhost:4000/api/me', { withCredentials: true });
      return data;
    }
  } catch (error) {
    throw Error(error.message);
  }
});
