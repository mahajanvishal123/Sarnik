import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import { apiUrl } from '../../redux/utils/config';


export const fetchReceivablePurchases = createAsyncThunk(
  'receivablePurchases/fetchReceivablePurchases',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/receivablePurchase`);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createReceivablePurchase = createAsyncThunk(
  'ReceivablePurchases/createReceivablePurchase',
  async (submissionData, { rejectWithValue }) => {
    try {
      let headers = {};
      if (submissionData instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data';
      } else {
        headers['Content-Type'] = 'application/json';
      }
      const response = await axiosInstance.post(
        `${apiUrl}/receivablePurchase`,
        submissionData,
        { headers }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteReceivablePurchase = createAsyncThunk(
  'ReceivablePurchases/deleteReceivablePurchase',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${apiUrl}/ReceivablePurchases/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchReceivablePurchaseById = createAsyncThunk('ReceivablePurchases/fetchById', async (id) => {
  const response = await fetch(`/api/jobs/${id}`);
  if (!response.ok) throw new Error("Failed to fetch job");
  return await response.json();
});


export const updateReceivablePurchase = createAsyncThunk(
  'ReceivablePurchases/updateReceivablePurchase',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/ReceivablePurchases/${id}`, {
        method: "PATCH", // PATCH should be uppercase
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || "Failed to update receivable purchase");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const imagelogoreceivablePurchase = createAsyncThunk(
  'logoreceivablePurchase/imagelogoreceivablePurchase',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/receivablePurchase/image`);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const receivablePurchaseSlice = createSlice({
  name: 'ReceivablePurchases',
  initialState: {
    purchases: [],
    logoreceivablePurchase:[],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReceivablePurchases.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReceivablePurchases.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.purchases = action.payload;
      })
      .addCase(fetchReceivablePurchases.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
    //   .addCase(fetchjobs.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(fetchjobs.fulfilled, (state, action) => {
    //     state.status = 'succeeded';
    //     state.purchases = action.payload;
    //   })
    //   .addCase(fetchjobs.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.payload;
    //   });
         .addCase(imagelogoreceivablePurchase.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(imagelogoreceivablePurchase.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.logoreceivablePurchase = action.payload;
      })
      .addCase(imagelogoreceivablePurchase.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export default receivablePurchaseSlice.reducer;
