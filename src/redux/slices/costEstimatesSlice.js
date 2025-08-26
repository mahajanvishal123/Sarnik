import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import { apiUrl } from '../../redux/utils/config';


export const fetchCostEstimates = createAsyncThunk(
  'costEstimates/fetchCostEstimates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/costEstimates`);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createCostEstimate = createAsyncThunk(
  'costEstimates/createCostEstimate',
  async (submissionData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${apiUrl}/costEstimates`,
        submissionData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCostEstimate = createAsyncThunk(
  'costEstimates/deleteCostEstimate',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${apiUrl}/costEstimates/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCostEstimateById = createAsyncThunk('costEstimates/fetchById', async (id) => {
  const response = await fetch(`/api/jobs/${id}`);
  if (!response.ok) throw new Error("Failed to fetch job");
  return await response.json();
});


export const updateCostEstimate = createAsyncThunk(
  'costEstimates/updateCostEstimate',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `${apiUrl}/costEstimates/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);




export const imagelogoCostEstimate = createAsyncThunk(
  'logoCostEstimate/imagelogoCostEstimate',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/costEstimates/image`);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const costEstimatesSlice = createSlice({
  name: 'costEstimates',
  initialState: {
    estimates: [],
    logoCostEstimate:[],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCostEstimates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCostEstimates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.estimates = action.payload;
      })
      .addCase(fetchCostEstimates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
    //   .addCase(fetchjobs.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(fetchjobs.fulfilled, (state, action) => {
    //     state.status = 'succeeded';
    //     state.estimates = action.payload;
    //   })
    //   .addCase(fetchjobs.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.payload;
    //   });
          .addCase(imagelogoCostEstimate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(imagelogoCostEstimate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.logoCostEstimate = action.payload;
      })
      .addCase(imagelogoCostEstimate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export default costEstimatesSlice.reducer;
