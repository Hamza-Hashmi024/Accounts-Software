import React, { useState, useEffect } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Paper,
  Typography,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../Globle/colors";
import { GetAllSalesInvoice } from "../../thunks/Api";


const Invoices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { salesInvoice, isLoading } = useSelector(
    (state) => state.SalesInvoice
  );
 

  // Search state
  const [searchId, setSearchId] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");
  const [adminType, setAdminType] = useState("");

  useEffect(() => {
    dispatch(GetAllSalesInvoice());
  }, [dispatch]);

  // Filter logic
  const filteredInvoices = salesInvoice?.filter((invoice) => {
    const matchesId = invoice.id?.toString().includes(searchId);
    const matchesCustomer = invoice.customer_id
      ?.toString()
      .toLowerCase()
      .includes(searchCustomer.toLowerCase());
    const matchesAdmin = adminType
      ? invoice.status?.toLowerCase() === adminType.toLowerCase()
      : true;
    return matchesId && matchesCustomer && matchesAdmin;
  });

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
          Sales Invoice Records
        </Typography>
      </Paper>

      {/* Search Filters */}
      <Grid container mt={4} spacing={2}>
        <Grid item>
          <TextField
            label="Search By ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Search By Customer"
            value={searchCustomer}
            onChange={(e) => setSearchCustomer(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item>
          <FormControl fullWidth size="small">
            <InputLabel>Search By Admin</InputLabel>
            <Select
              label="Search By Admin"
              value={adminType}
              onChange={(e) => setAdminType(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Credit">Credit</MenuItem>
              <MenuItem value="Bank">Bank</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Table */}
      <TableContainer className="mt-4">
        <Table size="small">
          <TableHead sx={{ backgroundColor: colors.SOLUTYICS_GRAY }}>
            <TableRow>
              {[
                "Invoice ID",
                "Invoice Number",
                "Customer ID",
                "Date",
                "Due Date",
                "Status",
                "Reference Number",
                "Notes",
                "Subtotal",
                "Action"
              ].map((header) => (
                <TableCell key={header} sx={{ color: colors.WHITE_COLOR }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading && filteredInvoices && filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice, idx) => (
                <TableRow key={idx}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.invoice_number}</TableCell>
                  <TableCell>{invoice.customer_id}</TableCell>
                  <TableCell>{invoice.invoice_date}</TableCell>
                  <TableCell>{invoice.due_date}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>{invoice.reference_number}</TableCell>
                  <TableCell>{invoice.notes}</TableCell>
                  <TableCell>{invoice.subtotal}</TableCell>
                  <TableCell className="cursor-pointer"
                    sx={{
                      color: colors.GREEN_COLOR,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                      onClick={() => navigate(`/invoice/view/${invoice.id}`)}
                  >
                    <FaRegEyeSlash /> View
                  </TableCell>
                   <TableCell className="cursor-pointer"
                    sx={{
                      color: colors.RED_COLOR,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <MdDelete /> Delete
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={17}>
                  {isLoading ? "Loading..." : "No invoices found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Invoices;
