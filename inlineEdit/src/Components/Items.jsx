import React, { useEffect, useState } from "react";
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
  // const [editedRows, setEditedRows] = useState({});
  const editedRows = useSelector((state) => state.editedRowSlice);

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


  const columns = Column({ handleFieldChange, editedRows, handleUpdate });

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={Items}
        columns={columns}
        // processRowUpdate={processRowUpdate}
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
    </Box>
  );
}

export default Items;
