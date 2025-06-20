import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdDelete } from "react-icons/md"; 
import { GetCreditInvoices } from "../../thunks/Api";
import { colors } from "../../Globle/colors";

const ReceivablesTable = () => {
  const dispatch = useDispatch();
  const { receivable, loading, error } = useSelector(
    (state) => state.Receivable
  );

  useEffect(() => {
    dispatch(GetCreditInvoices());
  }, [dispatch]);

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h5" gutterBottom>
        Credit Invoices
      </Typography>

      {loading && <CircularProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && receivable?.length === 0 && (
        <Alert severity="info">No credit invoices found.</Alert>
      )}

      {!loading && receivable?.length > 0 && (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead
              sx={{
                backgroundColor: colors.SOLUTYICS_GRAY,
              }}
            >
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>#</TableCell>
                <TableCell sx={{ color: "#fff" }}>Invoice Number</TableCell>
                <TableCell sx={{ color: "#fff" }}>Customer</TableCell>
                <TableCell sx={{ color: "#fff" }}>Due Date</TableCell>
                <TableCell sx={{ color: "#fff" }}>Amount Due</TableCell>
                <TableCell sx={{ color: "#fff" }}>Reference</TableCell>
                <TableCell sx={{ color: "#fff" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receivable.map((invoice, index) => (
                <TableRow key={invoice.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{invoice.invoice_number}</TableCell>
                  <TableCell>{invoice.customer_name}</TableCell>
                  <TableCell>
                    {new Date(invoice.due_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>Rs. {invoice.amount_due}</TableCell>
                  <TableCell>{invoice.reference_number}</TableCell>
                  <TableCell
                    className="cursor-pointer"
                    sx={{
                      color: colors.GREEN_COLOR,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <FaRegEyeSlash /> View
                  </TableCell>
                  <TableCell
                    className="cursor-pointer"
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default ReceivablesTable;
