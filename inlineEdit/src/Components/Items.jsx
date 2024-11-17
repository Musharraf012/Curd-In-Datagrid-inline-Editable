import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemRequest } from "../slices/getItemSlice";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { updateItemRequest } from "../slices/updateItemSlice";
import { select } from "redux-saga/effects";

function Items() {
  const Items = useSelector((state) => state.getItemSlice.items);
  console.log(Items);
  const [editedRows, setEditedRows] = useState({});

  console.log(editedRows);
  const handleUpdate = (row) => {
    const updatedRow = editedRows[row.id] || row; // Get the latest edit
    dispatch(updateItemRequest(updatedRow))
  };


  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Item Name",
      width: 150,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      editable: true,
    },
    {
      field: "isActive",
      headerName: "Is Active",
      type: "text",
      width: 110,
      editable: true,
      renderCell: (params) => {
        return (
          <>
            <select
              value={editedRows[params.row.id]?.isActive ?? params.row.isActive}
              onChange={(e) => {
                const updatedValue = e.target.value === "true"; // Convert to boolean
                setEditedRows((prev) => ({
                  ...prev,
                  [params.row.id]: {
                    ...params.row,
                    isActive: updatedValue,
                  },
                }));
              }}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </>
        );
      },
    },
    {
      field: "Update",
      headerName: "Update",
      type: "text",
      width: 120,
      //   editable: true,
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => {
                handleUpdate(params.row);
              }}
            >
              Update
            </button>
          </>
        );
      },
    },
    {
      field: "Enable",
      headerName: "Enable/Disable",
      type: "text",
      width: 160,
      renderCell: (params) => {
        const isActive = params.row.isActive;
    
        return (
          <>
            {!isActive && (
              <button
                onClick={() => {
                  const updatedRow = { ...params.row, isActive: true };
                  dispatch(updateItemRequest(updatedRow));
                  setEditedRows((prev) => ({ ...prev, [params.row.id]: updatedRow }));
                  setTimeout(()=>{
                    dispatch(getItemRequest());
                  },[1000])
              
                }}
              >
                Enable
              </button>
            )}
            {isActive && (
              <button
                onClick={() => {
                  const updatedRow = { ...params.row, isActive: false };
                  dispatch(updateItemRequest(updatedRow));
                  setEditedRows((prev) => ({ ...prev, [params.row.id]: updatedRow }));
                  setTimeout(()=>{
                    dispatch(getItemRequest());
                  },[1000])
                }}
              >
                Disable
              </button>
            )}
          </>
        );
      },
    }
    
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItemRequest());
  }, [dispatch]);
  const processRowUpdate = (newRow) => {
    console.log(newRow);

    setEditedRows((prev) => ({ ...prev, [newRow.id]: newRow }));
    return newRow;
  };
  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={Items}
          columns={columns}
          processRowUpdate={processRowUpdate} // Handle row edits
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
    </>
  );
}

export default Items;

