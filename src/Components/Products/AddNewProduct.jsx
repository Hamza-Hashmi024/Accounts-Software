import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetNextProductId, CreateProduct, GetTax } from "../../thunks/Api";
import {
  Paper,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import AddInvoice from "../../Button/AddInvoice";
import { colors } from "../../Globle/colors";

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const { nextProductId, isLoading, error } = useSelector(
    (state) => state.Product
  );
  const { taxes } = useSelector((state) => state.Tax);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    tax_id: "",
  });

  useEffect(() => {
    dispatch(GetNextProductId());
    dispatch(GetTax());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "tax_id" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(CreateProduct(formData));
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: colors.SOLUTYICS_GRAY,
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: colors.WHITE_COLOR,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Add New Product
        </Typography>
      </Paper>
      <div>
        {error && (
          <div className="md:col-span-2 text-red-500 text-sm">
            {typeof error === "string"
              ? error
              : error?.error || "An error occurred"}
          </div>
        )}

        <Box sx={{ padding: 4, borderRadius: 2 }}>
         <form onSubmit={handleSubmit}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
    
    {/* Column 1: Product Info */}
    <div className="flex flex-col space-y-4">
      <TextField
        label="Product ID"
        value={nextProductId || ""}
        InputProps={{ readOnly: true }}
        variant="outlined"
        size="small"
        fullWidth
      />
      <TextField
        name="name"
        label="Product Name"
        value={formData.name}
        onChange={handleChange}
        variant="outlined"
        required
        size="small"
        fullWidth
      />
      <TextField
        name="price"
        label="Price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        variant="outlined"
        required
        size="small"
        fullWidth
      />
    </div>

    {/* Column 2: Tax and Description */}
    <div className="flex flex-col space-y-4">
      <FormControl fullWidth size="small">
        <InputLabel id="tax-select-label">Tax Type</InputLabel>
        <Select
          labelId="tax-select-label"
          id="tax_id"
          name="tax_id"
          value={formData.tax_id}
          label="Tax Type"
          onChange={handleChange}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {taxes?.map((tax) => (
            <MenuItem key={tax.id} value={tax.id}>
              {tax.name} ({tax.rate}%)
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        variant="outlined"
        multiline
        rows={3}
        fullWidth
      />
    </div>

    {/* Error message */}
    {error && (
      <div className="md:col-span-2 text-red-500 text-sm">
        {error}
      </div>
    )}

    {/* Submit Button */}
    <div className="md:col-span-2 text-right">
      <AddInvoice
        label={isLoading ? "Adding..." : "Add Product"}
        disabled={isLoading}
      />
    </div>
  </div>
</form>

        </Box>
      </div>
    </>
  );
};

export default AddNewProduct;
