// slices/editedRowsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const editedRowSlice = createSlice({
  name: "editedRows",
  initialState,
  reducers: {
    updateEditedRow: (state, action) => {
      const { id, changes } = action.payload;
      state[id] = { ...state[id], ...changes };
    },
    clearEditedRow: (state, action) => {
      const { id } = action.payload;
      delete state[id];
    },
    clearAllEditedRows: () => {
      return {};
    },
  },
});

export const { updateEditedRow, clearEditedRow, clearAllEditedRows } = editedRowSlice.actions;

export default editedRowSlice.reducer;
