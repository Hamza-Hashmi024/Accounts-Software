import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, Typography, Box, CircularProgress, Alert, TextField, Grid, MenuItem
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetReciveAble } from "../../thunks/Api";
import { colors } from "../../Globle/colors";

const getStatusColor = (status) => {
  switch (status) {
    case "Paid": return colors.GREEN_COLOR;
    case "Unpaid": return colors.RED_COLOR;
    case "Overdue": return colors.PINK_COLOR;
    default: return colors.INACTIVE_GRAY_COLOR;
  }
};

const ReceivablesTable = () => {
  const dispatch = useDispatch();
  const { receivable, loading, error } = useSelector((state) => state.Receivable);

  const [filters, setFilters] = useState({
    invoice_id: "",
    customer_name: "",
    reference_number: "",
    due_date: "",
    from_date: "",
    to_date: "",
    payment_method: ""
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    const cleanedFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([_, v]) => v.trim() !== "")
    );

    dispatch(GetReciveAble(cleanedFilters));
  };

  useEffect(() => {
    dispatch(GetReciveAble({}));
  }, [dispatch]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: colors.DARK_GREEN_COLOR }}>
        Receivables
      </Typography>

      {/* Filter Inputs */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={2.4}>
          <TextField
            name="invoice_id"
            label="Invoice ID"
            value={filters.invoice_id}
            onChange={handleFilterChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={2.4}>
          <TextField
            name="customer_name"
            label="Customer Name"
            value={filters.customer_name}
            onChange={handleFilterChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={2.4}>
          <TextField
            name="reference_number"
            label="Reference Number"
            value={filters.reference_number}
            onChange={handleFilterChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={2.4}>
          <TextField
            name="due_date"
            label="Due Date (YYYY-MM-DD)"
            value={filters.due_date}
            onChange={handleFilterChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={2.4}>
          <TextField
            name="payment_method"
            label="Payment Method"
            value={filters.payment_method}
            onChange={handleFilterChange}
            fullWidth
            size="small"
            select
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Credit">Credit</MenuItem>
            <MenuItem value="Bank">Bank</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={2.4}>
          <TextField
            name="from_date"
            label="From Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.from_date}
            onChange={handleFilterChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={2.4}>
          <TextField
            name="to_date"
            label="To Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.to_date}
            onChange={handleFilterChange}
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>

      {/* Loader/Error */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Table */}
      {!loading && !error && (
        <TableContainer component={Paper} sx={{ backgroundColor: colors.GRAY_COLOR }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: colors.SLIGHTLY_DARK_GRAY_COLOR }}>
                <TableCell>Invoice #</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Reference</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Amount Due</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment Method</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receivable.length > 0 ? (
                receivable.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.invoice_number}</TableCell>
                    <TableCell>{invoice.customer_name}</TableCell>
                    <TableCell>{invoice.reference_number || "—"}</TableCell>
                    <TableCell>{invoice.due_date}</TableCell>
                    <TableCell>
                      <Typography fontWeight="bold" color={colors.BLACK_COLOR}>
                        ${Number(invoice.amount_due).toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={invoice.status}
                        sx={{
                          backgroundColor: getStatusColor(invoice.status),
                          color: colors.WHITE_COLOR,
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell>{invoice.payment_method || "—"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No matching receivables found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ReceivablesTable;
