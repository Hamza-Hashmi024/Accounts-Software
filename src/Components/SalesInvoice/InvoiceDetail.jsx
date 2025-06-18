import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Paper,
  Box,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { colors } from "../../Globle/colors";
import { GetAllCustomers } from "../../thunks/Api";
import { useEffect, useMemo } from "react";

const InvoiceDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Fetch invoice by ID 
  const invoice = useSelector((state) =>
    state.SalesInvoice.salesInvoice?.find((item) => item.id.toString() === id)
  );

  // Fetch customers from Redux
 const customers = useSelector((state) => state.Customer?.customers || []);
  console.log("Customers from Redux:", customers);

  // Fetch all customers on mount
  useEffect(() => {
    dispatch(GetAllCustomers());
  }, [dispatch]);

  // Prevent crashing while customers or invoice is not loaded
  const customer = useMemo(() => {
    if (!invoice || !invoice.customer_id) return null;
    return customers.find(
      (c) => c?.id?.toString() === invoice.customer_id?.toString()
    );
  }, [customers, invoice]);

  if (!invoice) {
    return (
      <Typography variant="h6" color="error" sx={{ m: 4 }}>
        Invoice not found.
      </Typography>
    );
  }

  // Sample company info
  const companyInfo = {
    name: "Solutyics",
    address: "793-C, Block C, Faisal Town, Lahore - Pakistan",
    city: "New York, NY 10001",
    phone: "+92-3316453646",
    email: "info@solutyics.com",
  };

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 1000,
        mx: "auto",
        mt: 5,
        p: 4,
        border: `1px solid ${colors.SLIGHTLY_DARK_GRAY_COLOR}`,
        backgroundColor: colors.WHITE_COLOR,
      }}
    >
      {/* Company Header */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h4"
          fontWeight={800}
          color={colors.SOLUTYICS_PURPLE}
        >
          {companyInfo.name}
        </Typography>
        <Typography variant="body2" color={colors.DARK_GRAY}>
          {companyInfo.address} | {companyInfo.city}
        </Typography>
        <Typography variant="body2" color={colors.DARK_GRAY}>
          Phone: {companyInfo.phone} | Email: {companyInfo.email}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: colors.SOLUTYICS_PURPLE, mb: 4 }} />

      {/* Invoice Info */}
      <Grid container spacing={4}>
        {/* BILL TO */}
        <Grid item xs={5}>
          <Typography variant="h6" fontWeight={700} color={colors.SOLUTYICS_PURPLE} gutterBottom>
            BILL TO:
          </Typography>
   <Box sx={{ p: 2, borderRadius: "4px", minHeight: 150 }}>
  <Typography fontWeight={600}>{customer?.name || "Customer Name"}</Typography>
  <Typography>{customer?.billing_address || "Street Address"}</Typography>
  <Typography>Phone: {customer?.phone || "Phone Number"}</Typography>
  <Typography>Email: {customer?.email || "email@domain.com"}</Typography>
</Box>
        </Grid>

        {/* INVOICE DETAILS */}
        <Grid item xs={3}>
          <Typography variant="h6" fontWeight={700} color={colors.SOLUTYICS_PURPLE} gutterBottom>
            INVOICE DETAILS
          </Typography>
          <Box sx={{ p: 2, borderRadius: "4px", minHeight: 150 }}>
            <DetailRow label="Invoice Number" value={invoice.invoice_number} />
            <DetailRow label="Invoice Date" value={invoice.invoice_date} />
            <DetailRow label="Due Date" value={invoice.due_date} />
            <DetailRow label="Reference" value={invoice.reference_number || "N/A"} />
            <DetailRow
              label="Status"
              value={
                <Typography
                  fontWeight={700}
                  color={
                    invoice.status === "Paid"
                      ? colors.GREEN_COLOR
                      : invoice.status === "Pending"
                      ? colors.YELLOW_COLOR
                      : colors.RED_COLOR
                  }
                >
                  {invoice.status}
                </Typography>
              }
            />
          </Box>
        </Grid>

        {/* SHIP TO */}
        <Grid item xs={4}>
          <Typography variant="h6" fontWeight={700} color={colors.SOLUTYICS_PURPLE} gutterBottom>
            SHIP TO:
          </Typography>
          <Box sx={{ p: 2, borderRadius: "4px", minHeight: 150 }}>
            <Typography fontWeight={600}>{invoice.ship_name || "Name/Department"}</Typography>
            <Typography>{invoice.ship_company || "Client Company"}</Typography>
            <Typography>{invoice.ship_address || "Shipping Address"}</Typography>
            <Typography>Phone: {invoice.ship_phone || "Phone Number"}</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Items Table */}
      <Box sx={{ mt: 4 }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: colors.SOLUTYICS_PURPLE }}>
              <TableRow>
                <TableCell sx={{ color: colors.WHITE_COLOR, fontWeight: 700 }}>DESCRIPTION</TableCell>
                <TableCell align="center" sx={{ color: colors.WHITE_COLOR, fontWeight: 700 }}>QTY</TableCell>
                <TableCell align="right" sx={{ color: colors.WHITE_COLOR, fontWeight: 700 }}>UNIT PRICE</TableCell>
                <TableCell align="right" sx={{ color: colors.WHITE_COLOR, fontWeight: 700 }}>TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice.items?.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor:
                      index % 2 === 0 ? colors.WHITE_COLOR : colors.CV_LIGHT_GRAY,
                  }}
                >
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="right">Rs. {item.unit_price}</TableCell>
                  <TableCell align="right">Rs. {item.total}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} sx={{ border: "none", height: 20 }} />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Summary */}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={8}>
          <Box>
            <Typography variant="h6" fontWeight={700} color={colors.SOLUTYICS_PURPLE} gutterBottom>
              REMARKS / NOTES
            </Typography>
            <Box sx={{ p: 2, backgroundColor: colors.CV_LIGHT_GRAY, borderRadius: "4px", minHeight: 100 }}>
              <Typography>{invoice.notes || "No additional remarks or notes for this invoice."}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ p: 2, backgroundColor: colors.SLIGHTLY_DARK_GRAY_COLOR, borderRadius: "4px" }}>
            <SummaryRow label="Subtotal" value={invoice.subtotal} />
            <SummaryRow label="Discount" value={`-${invoice.total_discount}`} />
            <SummaryRow label="Subtotal Less Discount" value={invoice.subtotal - invoice.total_discount} />
            <SummaryRow label={`Tax Rate (${invoice.tax_rate || 0}%)`} value={invoice.total_tax} />
            <SummaryRow label="Shipping/Handling" value={invoice.shipping_fee} />
            <Divider sx={{ my: 1, borderColor: colors.SOLUTYICS_GRAY }} />
            <SummaryRow label="TOTAL DUE" value={invoice.grand_total} bold color={colors.SOLUTYICS_PURPLE} />
            <SummaryRow label="Amount Paid" value={invoice.amount_paid} />
            <SummaryRow
              label="Amount Due"
              value={invoice.amount_due}
              bold
              color={invoice.amount_due > 0 ? colors.RED_COLOR : colors.GREEN_COLOR}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box
        sx={{
          mt: 4,
          pt: 2,
          borderTop: `1px solid ${colors.SLIGHTLY_DARK_GRAY_COLOR}`,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption" color={colors.DARK_GRAY}>
          Created at: {invoice.created_at}
        </Typography>
        <Typography variant="caption" color={colors.DARK_GRAY}>
          Last updated: {invoice.updated_at}
        </Typography>
      </Box>
    </Paper>
  );
};

// Reusable components
const DetailRow = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
    <Typography variant="body2" fontWeight={600}>{label}:</Typography>
    <Typography variant="body2">{value}</Typography>
  </Box>
);

const SummaryRow = ({ label, value, bold, color }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
    <Typography variant="body2" fontWeight={bold ? 700 : 500}>{label}</Typography>
    <Typography
      variant="body2"
      fontWeight={bold ? 800 : 500}
      color={color || colors.BLACK_COLOR}
    >
      Rs. {value}
    </Typography>
  </Box>
);

export default InvoiceDetail;
