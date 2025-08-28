// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../utils/axiosInstance';
// import { apiUrl } from '../utils/config';


// export const fetchInvoicingBilling = createAsyncThunk(
//   'InvoicingBilling/fetchInvoicingBilling',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(`${apiUrl}/InvoicingBilling`);
//       return response.data
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const createInvoicingBilling = createAsyncThunk(
//   'InvoicingBilling/createInvoicingBilling',
//   async (submissionData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(
//         `${apiUrl}/InvoicingBilling`,
//         submissionData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const deleteInvoicingBilling = createAsyncThunk(
//   'invocing/deleteInvoicingBilling',
//   async (_id, { rejectWithValue }) => {
//     try {
//       await axiosInstance.delete(`${apiUrl}/InvoicingBilling/${_id}`);
//       return _id;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const fetchCostEstimateById = createAsyncThunk('InvoicingBilling/fetchById', async (id) => {
//   const response = await fetch(`/api/jobs/${id}`);
//   if (!response.ok) throw new Error("Failed to fetch job");
//   return await response.json();
// });


// export const updateInvoicingBilling = createAsyncThunk(
//   'invocing/updateInvoicingBilling',
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${apiUrl}/InvoicingBilling/${id}`, {
//         method: "PATCH", // PATCH should be uppercase
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         return rejectWithValue(errorData.message || "Failed to update cost estimate");
//       }
//       const result = await response.json();
//       return result;
//     } catch (error) {
//       return rejectWithValue(error.message || "Something went wrong");
//     }
//   }
// );

// export const GetSingleInvoice = createAsyncThunk(
//   'InvoicingBilling/GetSingleInvoice',
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(`${apiUrl}/InvoicingBilling/invoicing`, payload);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );



// const InvoicingBillingSlice = createSlice({
//   name: 'InvoicingBilling',
//   initialState: {
//     invocing: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchInvoicingBilling.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchInvoicingBilling.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.invocing = action.payload;
//       })
//       .addCase(fetchInvoicingBilling.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//     //   .addCase(fetchjobs.pending, (state) => {
//     //     state.status = 'loading';
//     //   })
//     //   .addCase(fetchjobs.fulfilled, (state, action) => {
//     //     state.status = 'succeeded';
//     //     state.estimates = action.payload;
//     //   })
//     //   .addCase(fetchjobs.rejected, (state, action) => {
//     //     state.status = 'failed';
//     //     state.error = action.payload;
//     //   });
//        .addCase(GetSingleInvoice.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(GetSingleInvoice.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.invocing = action.payload;
//       })
//       .addCase(GetSingleInvoice.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//   },
// });

// export default InvoicingBillingSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import { apiUrl } from '../utils/config';

export const fetchInvoicingBilling = createAsyncThunk(
  'InvoicingBilling/fetchInvoicingBilling',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/InvoicingBilling`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createInvoicingBilling = createAsyncThunk(
  'InvoicingBilling/createInvoicingBilling',
  async (submissionData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${apiUrl}/InvoicingBilling`,
        submissionData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteInvoicingBilling = createAsyncThunk(
  'invocing/deleteInvoicingBilling',
  async (_id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${apiUrl}/InvoicingBilling/${_id}`);
      return _id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateInvoicingBilling = createAsyncThunk(
  'invocing/updateInvoicingBilling',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `${apiUrl}/InvoicingBilling/${id}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fixed GetSingleInvoice - using GET request with the correct endpoint
export const GetSingleInvoice = createAsyncThunk(
  'InvoicingBilling/GetSingleInvoice',
  async (invoiceId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${apiUrl}/InvoicingBilling/${invoiceId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const InvoicingBillingSlice = createSlice({
  name: 'InvoicingBilling',
  initialState: {
    invocing: { data: [] }, // Changed to object with data array
    status: 'idle',
    error: null,
    currentInvoice: null,
  },
  reducers: {
    // Clear current invoice when needed
    clearCurrentInvoice: (state) => {
      state.currentInvoice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all invoices
      .addCase(fetchInvoicingBilling.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvoicingBilling.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invocing = action.payload;
      })
      .addCase(fetchInvoicingBilling.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Get single invoice
      .addCase(GetSingleInvoice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetSingleInvoice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentInvoice = action.payload;
      })
      .addCase(GetSingleInvoice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create invoice
      .addCase(createInvoicingBilling.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createInvoicingBilling.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add the new invoice to the list
        if (state.invocing.data && Array.isArray(state.invocing.data)) {
          state.invocing.data.push(action.payload);
        } else {
          // Initialize as array if it doesn't exist
          state.invocing = { data: [action.payload] };
        }
      })
      .addCase(createInvoicingBilling.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update invoice
      .addCase(updateInvoicingBilling.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateInvoicingBilling.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // Update the invoice in the list - FIXED: Check if invocing.data exists and is an array
        if (state.invocing.data && Array.isArray(state.invocing.data)) {
          const index = state.invocing.data.findIndex(
            invoice => invoice._id === action.payload._id
          );
          if (index !== -1) {
            state.invocing.data[index] = action.payload;
          } else {
            // If not found, add it to the list
            state.invocing.data.push(action.payload);
          }
        } else {
          // Initialize as array if it doesn't exist
          state.invocing = { data: [action.payload] };
        }

        // Also update currentInvoice if it's the one being edited
        if (state.currentInvoice && state.currentInvoice._id === action.payload._id) {
          state.currentInvoice = action.payload;
        }
      })
      .addCase(updateInvoicingBilling.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Delete invoice
      .addCase(deleteInvoicingBilling.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteInvoicingBilling.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the invoice from the list - FIXED: Check if invocing.data exists
        if (state.invocing.data && Array.isArray(state.invocing.data)) {
          state.invocing.data = state.invocing.data.filter(
            invoice => invoice._id !== action.payload
          );
        }
        // Clear currentInvoice if it's the one being deleted
        if (state.currentInvoice && state.currentInvoice._id === action.payload) {
          state.currentInvoice = null;
        }
      })
      .addCase(deleteInvoicingBilling.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearCurrentInvoice } = InvoicingBillingSlice.actions;
export default InvoicingBillingSlice.reducer;



