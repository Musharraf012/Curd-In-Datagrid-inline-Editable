// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     updatedItems: [],
//     loading: false,
//     error: {}
// }

// const updateItemSlice = createSlice({
//     name: 'updatedItems',
//     initialState,
//     reducers: {
//         updateItemRequest: (state, action) => {
//             state.loading = true
//         },
//         updateItemSuccess: (state, action) => {
//             const index = state.updatedItems.findIndex((item) => item.id === action.payload.id);
//             if (index !== -1) {
//                 state.items[index] = action.payload;
//             }
//         },
//         updateItemFailure: (state, action) => {
//             state.loading = false
//             state.error = action.payload
//         }
//     }
// });

// export const { updateItemRequest, updateItemSuccess, updateItemFailure } = updateItemSlice.actions

// export default updateItemSlice.reducer

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  updatedItems: [], // List of items
  loading: false,   // Loading state
  error: null,      // Error information
};

const updateItemSlice = createSlice({
  name: 'updatedItems',
  initialState,
  reducers: {
    updateItemRequest: (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    },
    updateItemSuccess: (state, action) => {
      state.loading = false; // Reset loading
      const index = state.updatedItems.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.updatedItems[index] = action.payload; // Update the item
      }
    },
    updateItemFailure: (state, action) => {
      state.loading = false; // Reset loading
      state.error = action.payload; // Store the error
    },
  },
});

export const { updateItemRequest, updateItemSuccess, updateItemFailure } = updateItemSlice.actions;

export default updateItemSlice.reducer;
