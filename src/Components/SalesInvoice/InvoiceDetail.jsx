import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdReportGmailerrorred } from "react-icons/md";
import {
  Typography,
  Paper,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import { colors } from "../../Globle/colors";
import { useEffect } from "react";
import { GetSalesInvoicesViewById } from "../../thunks/Api";

const InvoiceDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(GetSalesInvoicesViewById(id));
    }
  }, [dispatch, id]);

  const invoice = useSelector((state) => state.SalesInvoice.salesInvoice);

  if (!invoice) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <MdReportGmailerrorred size={50} color="red" />
        <Typography variant="h5" color="error" sx={{ ml: 2 }}>
          Select Invoice Again
        </Typography>
      </Box>
    );
  }

  const { customer, items } = invoice;

  const companyInfo = {
    name: "Solutyics",
    address: "793-C, Block C, Faisal Town, Lahore - Pakistan",
    city: "New York, NY 10001",
    phone: "+92-3316453646",
    email: "info@solutyics.com",
  };

 

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 1000,
        mx: "auto",
        mt: 5,
        p: 4,
        backgroundColor: colors.WHITE_COLOR,
        boxShadow: 6,
        borderRadius: 2,
      }}
    >
      {/* Company Info */}
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

      {/* Invoice & Customer Info */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Invoice Details
          </Typography>
          <DetailRow label="Invoice Number" value={invoice.invoice_number} />
          <DetailRow
            label="Invoice Date"
            value={new Date(invoice.invoice_date).toLocaleDateString()}
          />
          <DetailRow
            label="Due Date"
            value={new Date(invoice.due_date).toLocaleDateString()}
          />
          <DetailRow label="Status" value={invoice.status} />
          <DetailRow label="Reference" value={invoice.reference_number} />
          <DetailRow label="Notes" value={invoice.notes || "-"} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Customer Info
          </Typography>
          <DetailRow label="Name" value={customer?.name} />
          <DetailRow label="Email" value={customer?.email} />
          <DetailRow label="Phone" value={customer?.phone} />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Items Table */}
      <Typography variant="h6" sx={{ mb: 1 }} fontWeight={600}>
        Invoice Items
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ backgroundColor: colors.LIGHT_GRAY_COLOR }}>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Tax</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product_name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">Rs. {item.unit_price}</TableCell>
                <TableCell align="right">{item.tax}%</TableCell>
                <TableCell align="right">{item.discount}%</TableCell>
                <TableCell align="right">Rs. {item.line_total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 3 }} />

      {/* Summary */}
      <Typography variant="h6" sx={{ mb: 1 }} fontWeight={600}>
        Summary
      </Typography>
      <Box sx={{ maxWidth: 400, ml: "auto" }}>
        <SummaryRow label="Subtotal" value={invoice.subtotal} />
        <SummaryRow label="Tax" value={invoice.total_tax} />
        <SummaryRow label="Shipping" value={invoice.shipping_fee} />
        <SummaryRow label="Discount" value={invoice.total_discount} />
        <SummaryRow label="Grand Total" value={invoice.grand_total} bold />
        <SummaryRow label="Paid" value={invoice.amount_paid} />
        <SummaryRow label="Due" value={invoice.amount_due} bold color="red" />
      </Box>
    </Paper>
  );
};

// Utility Components
const DetailRow = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
    <Typography
      variant="body2"
      fontWeight={600}
      sx={{ color: colors.DARK_GRAY }}
    >
      {label}:
    </Typography>
    <Typography variant="body2" sx={{ color: colors.BLACK_COLOR }}>
      {value}
    </Typography>
  </Box>
);

const SummaryRow = ({ label, value, bold, color }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
    <Typography variant="body2" fontWeight={bold ? 700 : 500}>
      {label}
    </Typography>
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
