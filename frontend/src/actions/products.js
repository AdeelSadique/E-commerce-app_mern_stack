import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const getAllProducts = createAsyncThunk('product/getAllProducts', async (url, thunkApi) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw Error(error.message);
  }
});
