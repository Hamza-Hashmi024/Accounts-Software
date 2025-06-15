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
    id: "",
    customer_name: "",
    reference_number: "",
    due_date: "",
    payment_method: "",
    from_date: "",
    to_date: ""
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    const cleanedFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([_, v]) => v.trim() !== "")
    );
    if (Object.keys(cleanedFilters).length > 0) {
      dispatch(GetReciveAble(cleanedFilters));
    }
  };

  useEffect(() => {
    dispatch(GetReciveAble({}));
  }, [dispatch]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography 
        variant="h5" 
        fontWeight="bold" 
        sx={{ 
          mb: 3, 
          color: colors.SOLUTYICS_PURPLE,
          paddingBottom: '8px',
          borderBottom: `2px solid ${colors.SOLUTYICS_GRAY}`
        }}
      >
        Receivables
      </Typography>

      {/* Filter Inputs */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { name: "id", label: "Invoice ID" },
          { name: "customer_name", label: "Customer Name" },
          { name: "reference_number", label: "Reference Number" },
          { name: "due_date", label: "Due Date (YYYY-MM-DD)" },
          { 
            name: "payment_method", 
            label: "Payment Method",
            select: true,
            options: ["Cash", "Credit", "Bank"]
          },
          { 
            name: "from_date", 
            label: "From Date",
            type: "date",
            shrink: true
          },
          { 
            name: "to_date", 
            label: "To Date",
            type: "date",
            shrink: true
          }
        ].map((field) => (
          <Grid item xs={12} sm={2.4} key={field.name}>
            <TextField
              name={field.name}
              label={field.label}
              value={filters[field.name]}
              onChange={handleFilterChange}
              fullWidth
              size="small"
              type={field.type || "text"}
              select={field.select || false}
              InputLabelProps={{ shrink: field.shrink || false }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: colors.SOLUTYICS_PURPLE,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: colors.SOLUTYICS_PURPLE,
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: colors.SOLUTYICS_PURPLE,
                }
              }}
            >
              {field.select && (
                <>
                  <MenuItem value="">All</MenuItem>
                  {field.options.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </>
              )}
            </TextField>
          </Grid>
        ))}
      </Grid>

      {/* Loader/Error */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress sx={{ color: colors.SOLUTYICS_PURPLE }} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Table */}
      {!loading && !error && (
        <TableContainer 
          component={Paper} 
          sx={{ 
            border: `1px solid ${colors.SOLUTYICS_GRAY}`,
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(71, 70, 76, 0.1)'
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: colors.SOLUTYICS_GRAY }}>
                {["Invoice #", "Customer", "Reference", "Due Date", "Amount Due", "Status", "Payment Method"].map(header => (
                  <TableCell 
                    key={header}
                    sx={{ 
                      color: colors.WHITE_COLOR, 
                      fontWeight: 600,
                      fontSize: '0.95rem'
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {receivable.length > 0 ? (
                receivable.map((invoice) => (
                  <TableRow 
                    key={invoice.id}
                    hover
                    sx={{ 
                      '&:nth-of-type(even)': { 
                        backgroundColor: colors.SLIGHTLY_DARK_GRAY_COLOR 
                      },
                      '&:hover': {
                        backgroundColor: `${colors.SOLUTYICS_PURPLE}10`
                      }
                    }}
                  >
                    <TableCell>{invoice.invoice_number}</TableCell>
                    <TableCell>{invoice.customer_name}</TableCell>
                    <TableCell>{invoice.reference_number || "—"}</TableCell>
                    <TableCell>{invoice.due_date}</TableCell>
                    <TableCell>
                      <Typography fontWeight="bold" color={colors.SOLUTYICS_GRAY}>
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
                          minWidth: '90px'
                        }}
                      />
                    </TableCell>
                    <TableCell>{invoice.payment_method || "—"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell 
                    colSpan={7} 
                    align="center"
                    sx={{ 
                      color: colors.SOLUTYICS_GRAY,
                      fontStyle: 'italic',
                      py: 4
                    }}
                  >
                    No matching receivables found
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