import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import { apiUrl } from '../../redux/utils/config';


export const getAllNotifications = createAsyncThunk(
  'notifiction/getAllNotifications',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/notifiction/getAllNotifications`);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const notifictionSlice = createSlice({
  name: 'notifiction',
  initialState: {
    Notifiction: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
          // Add
      .addCase(getAllNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.Notifiction = action.payload;
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
   
  },
});

export default notifictionSlice.reducer;
