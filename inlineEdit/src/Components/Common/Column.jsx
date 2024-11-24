import React, { useState } from "react";
import { Button, Switch, TextField } from "@mui/material";

const Column = ({
  handleFieldChange,
  editedRows,
  handleUpdate,
  handleFileClick,
}) => {
  // Log editedRows here to see its value when the component renders
  console.log("Edited Rows: ", editedRows);

  return [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "img",
      headerName: "Item Image",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex",
          alignItems:"center"
         }}>
          <img
            src={params.row.img}
            alt={params.row.name}
            style={{
              marginBottom: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              height: "30px",
              width: "50px",
            }}
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => handleFileClick(params.row.id)}
          >
            Upload
          </Button>
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Item Name",
      width: 150,
      renderCell: (params) => (
        <TextField
          fullWidth
          value={editedRows[params.row.id]?.name ?? params.row.name} // Show edited value or the default name
          onChange={(e) => {
            // Update the editedRows state with the new name value
            handleFieldChange(params.row.id, "name", e.target.value);
          }}
          variant="standard"
          size="small"
          sx={{ "& .MuiInput-underline:before": { borderBottom: "none" } }}
        />
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      renderCell: (params) => (
        <TextField
          fullWidth
          type="number"
          value={editedRows[params.row.id]?.price ?? params.row.price} // Show edited value or the default price
          onChange={(e) => {
            // Update the editedRows state with the new price value
            handleFieldChange(params.row.id, "price", e.target.value);
          }}
          variant="standard"
          size="small"
          sx={{ "& .MuiInput-underline:before": { borderBottom: "none" } }}
        />
      ),
    },
    {
      field: "isActive",
      headerName: "Is Active",
      width: 110,
      renderCell: (params) => (
        <Switch
          checked={editedRows[params.row.id]?.isActive ?? params.row.isActive} // Show edited value or the default state
          onChange={(e) => {
            // Update the editedRows state with the new switch value
            handleFieldChange(params.row.id, "isActive", e.target.checked);
          }}
        />
      ),
    },
    {
      field: "isdoordashallow",
      headerName: "Is DD Allow",
      width: 110,
      renderCell: (params) => (
        <Switch
          checked={
            editedRows[params.row.id]?.isdoordashallow ??
            params.row.isdoordashallow
          } // Show edited value or the default state
          onChange={(e) => {
            // Update the editedRows state with the new switch value
            handleFieldChange(
              params.row.id,
              "isdoordashallow",
              e.target.checked
            );
          }}
        />
      ),
    },
    {
      field: "ischownowallow",
      headerName: "Is CN Allow",
      width: 110,
      renderCell: (params) => (
        <Switch
          checked={
            editedRows[params.row.id]?.ischownowallow ??
            params.row.ischownowallow
          } // Show edited value or the default state
          onChange={(e) => {
            // Update the editedRows state with the new switch value
            handleFieldChange(
              params.row.id,
              "ischownowallow",
              e.target.checked
            );
          }}
        />
      ),
    },
    {
      field: "isgrubhuballow",
      headerName: "Is GH Allow",
      width: 110,
      renderCell: (params) => (
        <Switch
          checked={
            editedRows[params.row.id]?.isgrubhuballow ??
            params.row.isgrubhuballow
          } // Show edited value or the default state
          onChange={(e) => {
            // Update the editedRows state with the new switch value
            handleFieldChange(
              params.row.id,
              "isgrubhuballow",
              e.target.checked
            );
          }}
        />
      ),
    },
    {
      field: "Update",
      headerName: "Update",
      width: 120,
      renderCell: (params) => (
        <button
          onClick={() => handleUpdate(params.row.id)} // Call the update function to persist changes
          disabled={!editedRows[params.row.id]} // Disable if no changes are made
        >
          Update
        </button>
      ),
    },
  ];
};

export default Column;

// };

// export default Column;
