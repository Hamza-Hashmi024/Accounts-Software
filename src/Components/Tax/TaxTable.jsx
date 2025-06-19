import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetTax, UpdateTax } from "../../thunks/Api";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { colors } from "../../Globle/colors";

const TaxTable = () => {
  const dispatch = useDispatch();
  const { taxes, loading, error } = useSelector((state) => state.Tax);

  const [editRowId, setEditRowId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    rate: "",
    description: "",
  });

  useEffect(() => {
    dispatch(GetTax());
  }, [dispatch]);

  const handleEditClick = (tax) => {
    setEditRowId(tax.id);
    setFormData({
      name: tax.name,
      rate: tax.rate,
      description: tax.description || "",
    });
  };

  const handleCancel = () => {
    setEditRowId(null);
    setFormData({ name: "", rate: "", description: "" });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.rate) {
      alert("Name and Rate are required.");
      return;
    }
    dispatch(UpdateTax({ id: editRowId, ...formData }));
    setEditRowId(null);
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Tax List
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : taxes.length === 0 ? (
        <Typography>No taxes found.</Typography>
      ) : (
        <Table>
          <TableHead
            sx={{
              backgroundColor: colors.SOLUTYICS_GRAY,
              "& .MuiTableCell-head": {
                color: colors.WHITE_COLOR,
                fontWeight: "bold",
              },
            }}
          >
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Catagories</TableCell>
              <TableCell>Rate (%)</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taxes.map((tax) => (
              <TableRow key={tax.id}>
                <TableCell>{tax.id}</TableCell>

                <TableCell>
                  {editRowId === tax.id ? (
                    <TextField
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      size="small"
                    />
                  ) : (
                    tax.name
                  )}
                </TableCell>

                <TableCell>
                  {editRowId === tax.id ? (
                    <TextField
                      type="number"
                      value={formData.rate}
                      onChange={(e) => handleChange("rate", e.target.value)}
                      size="small"
                    />
                  ) : (
                    `${parseFloat(tax.rate).toFixed(2)}%`
                  )}
                </TableCell>

                <TableCell>
                  {editRowId === tax.id ? (
                    <TextField
                      value={formData.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                      size="small"
                    />
                  ) : (
                    tax.description || "-"
                  )}
                </TableCell>

                <TableCell>
                  {new Date(tax.created_at).toLocaleString()}
                </TableCell>

                <TableCell sx={{ display: "flex", gap: 1 }}>
                  {editRowId === tax.id ? (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="inherit"
                        size="small"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Typography
                      onClick={() => handleEditClick(tax)}
                      sx={{
                        color: colors.GREEN_COLOR,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontWeight: "bold",
                      }}
                    >
                      <CiEdit /> Edit
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default TaxTable;
