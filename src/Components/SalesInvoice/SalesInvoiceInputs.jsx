import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateSalesInvoice,
  GetAllProducts,
  GetAllCustomers,
  GetCustomerName,
  GetInvoiceNumOrRefNum,
  GetTax,
} from "../../thunks/Api";
import { colors } from "../../Globle/colors";
import CreateCustomer from "../../Button/CreateCustomerButoon";
import { Autocomplete } from "@mui/material";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Alert,
  Box,
  Paper,
} from "@mui/material";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";

const SalesInvoiceInputs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Product.products);
  const customers = useSelector((state) => state.Customer.customers || []);
  const invoiceMeta = useSelector(
    (state) => state.SalesInvoice.invoiceMeta || {}
  );
  const taxes = useSelector((state) => state.Tax.taxes || []);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [invoiceDetails, setInvoiceDetails] = useState({
    invoice_number: "",
    customer_id: "",
    invoice_date: "",
    due_date: "",
    status: "",
    reference_number: "",
    notes: "",
    subtotal: 0,
    total_discount: 0,
    total_tax: 0,
    shipping_fee: 0,
    grand_total: 0,
    amount_paid: 0,
    amount_due: 0,
  });

  const [items, setItems] = useState([
    {
      product_id: "",
      description: "",
      quantity: 1,
      unit_price: 0,
      discount: 0,
      tax: 0,
      line_total: 0,
    },
  ]);

  const handleInvoiceChange = (field, value) => {
    setInvoiceDetails({ ...invoiceDetails, [field]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === "product_id") {
      const product = products.find(
        (p) =>
          String(p.id) === String(value) ||
          String(p.product_id) === String(value)
      );

      if (product) {
        updatedItems[index].description = product.name || "";
        updatedItems[index].unit_price = parseFloat(product.price || 0);

        // Find tax rate
        const taxEntry = taxes.find((t) => t.id === product.tax_id);
        updatedItems[index].tax = parseFloat(taxEntry?.rate || 0);
      } else {
        // Reset if product not found
        updatedItems[index].description = "";
        updatedItems[index].unit_price = 0;
        updatedItems[index].tax = 0;
      }
    }

    // Recalculate line total
    const qty = parseFloat(updatedItems[index].quantity || 0);
    const price = parseFloat(updatedItems[index].unit_price || 0);
    const discount = parseFloat(updatedItems[index].discount || 0);
    const tax = parseFloat(updatedItems[index].tax || 0);

    updatedItems[index].line_total =
      qty * price - discount + (qty * price * tax) / 100;

    setItems(updatedItems);
  };

  const calculateSubtotal = () =>
    items.reduce(
      (acc, item) =>
        acc + parseFloat(item.quantity || 0) * parseFloat(item.unit_price || 0),
      0
    );

  const calculateTotalDiscount = () =>
    items.reduce((acc, item) => acc + parseFloat(item.discount || 0), 0);

  const calculateTotalTax = () =>
    items.reduce((acc, item) => acc + parseFloat(item.tax || 0), 0);

  const calculateGrandTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateTotalDiscount();
    const tax = calculateTotalTax();
    const shipping = parseFloat(invoiceDetails.shipping_fee || 0);
    return subtotal - discount + tax + shipping;
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        product_id: "",
        description: "",
        quantity: 1,
        unit_price: 0,
        discount: 0,
        tax: 0,
        line_total: 0,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subtotal = calculateSubtotal();
    const totalDiscount = calculateTotalDiscount();
    const totalTax = calculateTotalTax();
    const shippingFee = parseFloat(invoiceDetails.shipping_fee || 0);
    const grandTotal = subtotal - totalDiscount + totalTax + shippingFee;
    const amountPaid = parseFloat(invoiceDetails.amount_paid || 0);
    const amountDue = grandTotal - amountPaid;

    const payload = {
      invoice: {
        ...invoiceDetails,
        subtotal: subtotal.toFixed(2),
        total_discount: totalDiscount.toFixed(2),
        total_tax: totalTax.toFixed(2),
        grand_total: grandTotal.toFixed(2),
        amount_due: amountDue.toFixed(2),
      },
      items: items.map((item) => ({
        ...item,
        quantity: parseFloat(item.quantity || 0).toFixed(2),
        unit_price: parseFloat(item.unit_price || 0).toFixed(2),
        discount: parseFloat(item.discount || 0).toFixed(2),
        tax: parseFloat(item.tax || 0).toFixed(2),
        line_total: parseFloat(item.line_total || 0).toFixed(2),
      })),
    };

    try {
      await dispatch(CreateSalesInvoice(payload)).unwrap();
      setAlert({ type: "success", message: "Invoice created successfully!" });
    } catch (err) {
      setAlert({ type: "error", message: "Failed to create invoice.", err });
    }

    console.log("Payload:", payload);
  };

  // useEffect(() => {
  //   dispatch(GetAllProducts());
  // }, []);

  useEffect(() => {
    dispatch(GetAllProducts());
    dispatch(GetCustomerName());
    dispatch(GetInvoiceNumOrRefNum());
    dispatch(GetTax());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(GetInvoiceNumOrRefNum());
  // }, [dispatch]);

  useEffect(() => {
    if (invoiceMeta.invoice_number || invoiceMeta.reference_number) {
      setInvoiceDetails((prev) => ({
        ...prev,
        invoice_number: invoiceMeta.invoice_number || prev.invoice_number,
        reference_number: invoiceMeta.reference_number || prev.reference_number,
      }));
    }
  }, [invoiceMeta]);

  // useEffect(() => {
  //   dispatch(GetTax());
  // }, []);

  return (
    <Box maxWidth="lg" mx="auto" p={3}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: colors.SOLUTYICS_PURPLE,
          textTransform: "uppercase",
          letterSpacing: 1,
          paddingBottom: "8px",
          borderBottom: `2px solid ${colors.SOLUTYICS_GRAY}`,
        }}
      >
        Sales Invoice
      </Typography>

      {/* Main Invoice Fields */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {[
          { label: "Invoice Number", field: "invoice_number", readOnly: true },
          { label: "Invoice Date", field: "invoice_date", type: "date" },
          { label: "Due Date", field: "due_date", type: "date" },
          { label: "Status", field: "status", type: "select" },
          {
            label: "Reference Number",
            field: "reference_number",
            readOnly: true,
          },
          { label: "Notes", field: "notes" },
          { label: "Shipping Fee", field: "shipping_fee", type: "number" },
          { label: "Amount Paid", field: "amount_paid", type: "number" },
        ].map(({ label, field, type = "text", readOnly = false }) => (
          <Grid item xs={12} sm={6} md={4} key={field}>
            {field === "status" ? (
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: colors.SOLUTYICS_GRAY }}>
                  {label}
                </InputLabel>
                <Select
                  label={label}
                  value={invoiceDetails[field] || ""}
                  onChange={(e) => handleInvoiceChange(field, e.target.value)}
                  sx={{
                    "& .MuiSelect-select": { color: colors.SOLUTYICS_GRAY },
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: colors.SOLUTYICS_PURPLE,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: colors.SOLUTYICS_PURPLE,
                      },
                    },
                  }}
                >
                  {["Cash", "Credit", "Bank"].map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                fullWidth
                type={type}
                label={label}
                value={invoiceDetails[field] || ""}
                onChange={(e) => handleInvoiceChange(field, e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly,
                  sx: {
                    color: colors.SOLUTYICS_GRAY,
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: colors.SOLUTYICS_GRAY,
                    },
                  },
                }}
                InputLabelProps={{
                  sx: { color: colors.SOLUTYICS_GRAY },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: colors.SOLUTYICS_PURPLE,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.SOLUTYICS_PURPLE,
                    },
                  },
                }}
              />
            )}
          </Grid>
        ))}

        {/* Customer Autocomplete */}
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            disablePortal
            options={customers}
            getOptionLabel={(option) =>
              typeof option === "string"
                ? option
                : option?.name
                ? `${option.name.trim()} (ID: ${option.id})`
                : ""
            }
            isOptionEqualToValue={(option, value) =>
              String(option.id) === String(value.id)
            }
            value={
              customers.find(
                (c) => String(c.id) === String(invoiceDetails.customer_id)
              ) || null
            }
            onChange={(event, newValue) =>
              handleInvoiceChange("customer_id", newValue ? newValue.id : "")
            }
            fullWidth
            openOnFocus
            renderInput={(params) => (
              <TextField
                {...params}
                label="Customer"
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: colors.SOLUTYICS_PURPLE,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.SOLUTYICS_PURPLE,
                    },
                  },
                }}
              />
            )}
            sx={{ width: "100%" }}
          />
        </Grid>
      </Grid>

      <Divider sx={{ mt: 3, mb: 2, borderColor: colors.SOLUTYICS_GRAY }} />

      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
        <Box>
          <CreateCustomer
            onClick={() => navigate("/create/customer")}
            sx={{
              backgroundColor: colors.WHITE_COLOR,
              border: `1px solid ${colors.SOLUTYICS_PURPLE}`,
              color: colors.SOLUTYICS_PURPLE,
              "&:hover": {
                backgroundColor: `${colors.SOLUTYICS_PURPLE}10`,
              },
            }}
          />
        </Box>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: colors.SOLUTYICS_PURPLE,
            "&:hover": {
              backgroundColor: "#7a3268",
            },
          }}
        >
          Submit Invoice
        </Button>
      </Box>

      {alert.message && (
        <Alert
          severity={alert.type}
          sx={{
            mt: 2,
            backgroundColor:
              alert.type === "error"
                ? colors.LIGHT_RED_COLOR
                : colors.LIGHT_GREEN_COLOR,
            color: colors.SOLUTYICS_GRAY,
          }}
        >
          {alert.message}
        </Alert>
      )}

      {/* Items Table */}
      <Typography
        variant="h6"
        sx={{
          mt: 4,
          mb: 2,
          color: colors.SOLUTYICS_PURPLE,
          fontWeight: 600,
          paddingBottom: "4px",
          borderBottom: `1px solid ${colors.SOLUTYICS_GRAY}`,
        }}
      >
        Items
      </Typography>

      {/* <Paper
        elevation={0}
        sx={{
          border: `1px solid ${colors.SOLUTYICS_GRAY}`,
          borderRadius: "4px",
          p: 1,
          mb: 2,
        }}
      >
        {items.map((item, index) => (
          <Grid
            container
            spacing={1}
            key={index}
            alignItems="center"
            mb={1}
            sx={{
              padding: 1,
              borderRadius: "4px",
              backgroundColor:
                index % 2 === 0
                  ? colors.WHITE_COLOR
                  : colors.SLIGHTLY_DARK_GRAY_COLOR,
              "&:hover": {
                backgroundColor: `${colors.SOLUTYICS_PURPLE}08`,
              },
            }}
          >
            <Grid item xs={12} sm={3}>
              <Autocomplete
                options={products || []}
                getOptionLabel={(option) =>
                  option
                    ? `${option.product_id || option.id} - ${option.name}`
                    : ""
                }
                value={
                  (products || []).find(
                    (p) =>
                      String(p.id) === String(item.product_id) ||
                      String(p.product_id) === String(item.product_id)
                  ) || null
                }
                onChange={(event, newValue) => {
                  handleItemChange(
                    index,
                    "product_id",
                    newValue ? newValue.id || newValue.product_id : ""
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: colors.SOLUTYICS_PURPLE,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: colors.SOLUTYICS_PURPLE,
                        },
                      },
                    }}
                  />
                )}
                isOptionEqualToValue={(option, value) => {
                  if (!option || !value) return false;
                  return (
                    String(option.id) === String(value.id) ||
                    String(option.product_id) === String(value.product_id)
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Description"
                value={item.description}
                InputProps={{ readOnly: true }}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3} md={2} lg={2}>
              <TextField
                type="number"
                fullWidth
                label="Qty"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={1.5}>
              <TextField
                type="number"
                fullWidth
                label="Unit Price"
                InputProps={{ readOnly: true }}
                value={item.unit_price}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <TextField
                type="number"
                fullWidth
                label="Discount"
                InputProps={{ readOnly: true }}
                value={item.discount}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <TextField
                type="number"
                fullWidth
                label="Tax"
                InputProps={{ readOnly: true }}
                value={item.tax}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <Typography fontWeight="bold" color={colors.SOLUTYICS_GRAY}>
                ${parseFloat(item.line_total || 0).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Paper> */}
      <Paper
        elevation={0}
        sx={{
          border: `1px solid ${colors.SOLUTYICS_GRAY}`,
          borderRadius: "4px",
          p: 1,
          mb: 2,
        }}
      >
        {items.map((item, index) => (
          <Grid
            container
            wrap="nowrap"
            spacing={1}
            key={index}
            alignItems="center"
            sx={{
              padding: 1,
              borderRadius: "4px",
              backgroundColor:
                index % 2 === 0
                  ? colors.WHITE_COLOR
                  : colors.SLIGHTLY_DARK_GRAY_COLOR,
              "&:hover": {
                backgroundColor: `${colors.SOLUTYICS_PURPLE}08`,
              },
              overflowX: "auto", // Optional: if too many fields on small screens
            }}
          >
            <Grid item sx={{ minWidth: 200 }}>
              <Autocomplete
                options={products || []}
                getOptionLabel={(option) =>
                  option
                    ? `${option.product_id || option.id} - ${option.name}`
                    : ""
                }
                value={
                  (products || []).find(
                    (p) =>
                      String(p.id) === String(item.product_id) ||
                      String(p.product_id) === String(item.product_id)
                  ) || null
                }
                onChange={(event, newValue) => {
                  handleItemChange(
                    index,
                    "product_id",
                    newValue ? newValue.id || newValue.product_id : ""
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: colors.SOLUTYICS_PURPLE,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: colors.SOLUTYICS_PURPLE,
                        },
                      },
                    }}
                  />
                )}
                isOptionEqualToValue={(option, value) => {
                  if (!option || !value) return false;
                  return (
                    String(option.id) === String(value.id) ||
                    String(option.product_id) === String(value.product_id)
                  );
                }}
              />
            </Grid>

            <Grid item sx={{ minWidth: 150 }}>
              <TextField
                label="Description"
                value={item.description}
                InputProps={{ readOnly: true }}
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item sx={{ minWidth: 100 }}>
              <TextField
                type="number"
                fullWidth
                label="Qty"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
                size="small"
              />
            </Grid>

            <Grid item sx={{ minWidth: 120 }}>
              <TextField
                type="number"
                fullWidth
                label="Unit Price"
                InputProps={{ readOnly: true }}
                value={item.unit_price}
                size="small"
              />
            </Grid>

            <Grid item sx={{ minWidth: 100 }}>
              <TextField
                type="number"
                fullWidth
                label="Discount"
                InputProps={{ readOnly: true }}
                value={item.discount}
                size="small"
              />
            </Grid>

            <Grid item sx={{ minWidth: 100 }}>
              <TextField
                type="number"
                fullWidth
                label="Tax"
                InputProps={{ readOnly: true }}
                value={item.tax}
                size="small"
              />
            </Grid>

            <Grid item sx={{ minWidth: 100 }}>
              <Typography fontWeight="bold" color={colors.SOLUTYICS_GRAY}>
                ${parseFloat(item.line_total || 0).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Paper>

      <Button
        variant="contained"
        color="success"
        onClick={addItem}
        sx={{
          mt: 1,
          backgroundColor: colors.SOLUTYICS_PURPLE,
          "&:hover": {
            backgroundColor: "#7a3268",
          },
        }}
      >
        + Add Item
      </Button>

      {/* Totals Section */}
      <Box
        mt={4}
        textAlign="right"
        sx={{
          p: 2,
          backgroundColor: colors.SLIGHTLY_DARK_GRAY_COLOR,
          borderRadius: "4px",
        }}
      >
        <Typography color={colors.SOLUTYICS_GRAY}>
          Subtotal: ${calculateSubtotal().toFixed(2)}
        </Typography>
        <Typography color={colors.SOLUTYICS_GRAY}>
          Total Discount: ${calculateTotalDiscount().toFixed(2)}
        </Typography>
        <Typography color={colors.SOLUTYICS_GRAY}>
          Total Tax: ${calculateTotalTax().toFixed(2)}
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          color={colors.SOLUTYICS_PURPLE}
        >
          Grand Total: ${calculateGrandTotal().toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default SalesInvoiceInputs;
