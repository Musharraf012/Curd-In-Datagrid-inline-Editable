import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemRequest } from "../slices/getItemSlice";
import { updateItemRequest } from "../slices/updateItemSlice";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Column from "./Common/Column";
import { clearAllEditedRows, clearEditedRow, updateEditedRow } from "../slices/editedRowSlice";

function Items() {
  const Items = useSelector((state) => state.getItemSlice.items);
  const dispatch = useDispatch();
  const editedRows = useSelector((state) => state.editedRowSlice);
  const fileInputRef = useRef(null); // File input reference
  const currentRowId = useRef(null); // Track the current row being edited

  console.log(editedRows);
  

  console.log(Items);
  
  useEffect(() => {
    dispatch(getItemRequest());
    dispatch(clearAllEditedRows());
  }, [dispatch]);

  // Update the row when the button is clicked
  const handleUpdate = (rowId) => {
    const updatedRow = {
      ...Items.find((item) => item.id === rowId),
      ...editedRows[rowId],
    };
    dispatch(updateItemRequest(updatedRow)); // Dispatch the updated row
    dispatch(clearEditedRow({ id: rowId }));
    setTimeout(() => {
      dispatch(getItemRequest())
    }, 1000);
  };

  const handleFieldChange = (rowId, field, value) => {
    dispatch(updateEditedRow({ id: rowId, changes: { [field]: value } }));
  };

    // Trigger file input for changing images
    const handleFileClick = (rowId) => {
      currentRowId.current = rowId; // Track the current row
      fileInputRef.current.click(); // Open file picker
    };
  
    // Handle the file change event
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imgURL = URL.createObjectURL(file); // Create a temporary URL for the image
        handleFieldChange(currentRowId.current, "img", imgURL); // Update the Redux state with the new image
      }
    };

  const columns = Column({ handleFieldChange, editedRows, handleUpdate,  handleFileClick });

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={Items}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
       <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Box>
  );
}

export default Items;
