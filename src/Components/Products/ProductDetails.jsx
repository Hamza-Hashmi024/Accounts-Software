import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TextField,
  Button,
  Typography,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  GetProductById,
  DeleteProductById,
  UpdateProduct,
} from "../../thunks/Api";
import SearchButton from "../../Button/SearchButton";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector((state) => state.Product);
  const [productId, setProductId] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    tax_rate: "",
    created_at: null,
  });

  const handleFetch = async () => {
    if (!productId) return;

    try {
      const resultAction = await dispatch(GetProductById(productId));

      if (GetProductById.rejected.match(resultAction)) {
        const msg = resultAction.payload?.error || "Product does not exist.";
        setErrorMessage(msg);
        setErrorOpen(true);
        setIsEditing(false);
      } else {
        setIsEditing(false); // reset editing on successful fetch
      }
    } catch (err) {
      setErrorMessage("Unexpected error during fetch.", err);
      setErrorOpen(true);
    }
  };

  const handleDelete = async () => {
    if (!product?.id) {
      setErrorMessage("No product selected to delete");
      setErrorOpen(true);
      return;
    }

    try {
      const resultAction = await dispatch(DeleteProductById(product.id));

      if (DeleteProductById.rejected.match(resultAction)) {
        const msg =
          resultAction.payload?.error ||
          "Failed to delete product. It may be used in other records.";
        setErrorMessage(msg);
        setErrorOpen(true);
      } else {
        // Optionally clear the product from UI after successful delete
        setProductId("");
        setIsEditing(false);
      }
    } catch (err) {
      setErrorMessage("Unexpected error during deletion.", err);
      setErrorOpen(true);
    }
  };

  const handleEdit = () => {
    setEditForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      tax_rate: product.tax_rate || "",
      created_at: product.created_at || null,
    });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...editForm,
        created_at: editForm.created_at
          ? new Date(editForm.created_at).toISOString()
          : null,
      };

      const resultAction = await dispatch(
        UpdateProduct({ id: product.id, payload })
      );

      if (UpdateProduct.fulfilled.match(resultAction)) {
        setSuccessOpen(true);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="mt-10">
      <div className="flex items-center gap-4 mb-6">
        <TextField
          label="Enter Product ID"
          variant="outlined"
          fullWidth
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <SearchButton
          label="Search"
          onClick={handleFetch}
          disabled={isLoading}
        />
      </div>

      {isLoading && <CircularProgress className="m-auto mt-4" />}
      {error && (
        <p className="text-red-500 text-center">{error?.error || error}</p>
      )}

      {!isLoading && product && (
        <>
          <Typography variant="h6" className="text-center mb-4 font-bold">
            Product Details
          </Typography>
          <TableContainer component={Paper} className="shadow-lg">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price (₹)</TableCell>
                  <TableCell>Tax Name</TableCell> {/* NEW */}
                  <TableCell>Tax Rate (%)</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        name="name"
                        value={editForm.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      product.name
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        name="description"
                        value={editForm.description}
                        onChange={handleInputChange}
                      />
                    ) : (
                      product.description
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        name="price"
                        type="number"
                        value={editForm.price}
                        onChange={handleInputChange}
                      />
                    ) : (
                      product.price
                    )}
                  </TableCell>

                  {/* Tax Name (Not Editable) */}
                  <TableCell>{product.tax_name || "N/A"}</TableCell>

                  {/* Tax Rate (Editable) */}
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        name="tax_rate"
                        type="number"
                        value={editForm.tax_rate}
                        onChange={handleInputChange}
                      />
                    ) : (
                      product.tax_rate
                    )}
                  </TableCell>

                  <TableCell>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      {isEditing ? (
                        <DatePicker
                          label="Created At"
                          value={
                            editForm.created_at
                              ? new Date(editForm.created_at)
                              : null
                          }
                          onChange={(date) =>
                            setEditForm({
                              ...editForm,
                              created_at: date ? date.toISOString() : null,
                            })
                          }
                          renderInput={(params) => <TextField {...params} />}
                        />
                      ) : product.created_at ? (
                        new Date(product.created_at).toLocaleString()
                      ) : (
                        "N/A"
                      )}
                    </LocalizationProvider>
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      {isEditing ? (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleEdit}
                        >
                          Edit
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Success Snackbar */}
          <Snackbar
            open={successOpen}
            autoHideDuration={3000}
            onClose={() => setSuccessOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              onClose={() => setSuccessOpen(false)}
              severity="success"
              elevation={6}
              variant="filled"
              sx={{ width: "100%" }}
            >
              Product successfully updated!
            </MuiAlert>
          </Snackbar>

          <Snackbar
            open={errorOpen}
            autoHideDuration={3000}
            onClose={() => setErrorOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              onClose={() => setErrorOpen(false)}
              severity="error"
              elevation={6}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </MuiAlert>
          </Snackbar>

          {error && (
            <p className="text-red-500 text-center">{error?.error || error}</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetails;
