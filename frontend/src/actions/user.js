import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/me`, { withCredentials: true });
    return data;
  } catch (error) {
    throw Error(error.message);
  }
});
export const deleteUser = createAsyncThunk('user/deleteUser', async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, { withCredentials: true });
    console.log(data);
    // return data;
  } catch (error) {
    throw Error(error.message);
  }
});
