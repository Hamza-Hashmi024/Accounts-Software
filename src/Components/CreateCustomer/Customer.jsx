import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  TextField,
  Grid,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { CreateCustomer } from "../../thunks/Api";
import CreateCustomerButton from "../../Button/CreateCustomerButoon";
import { colors } from "../../Globle/colors";
import SearchCustomer from "./SearchCustomer";

const Customer = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    billing_address: "",
    shipping_address: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CreateCustomer(formData));
    console.log("Customer Payload:", formData);
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
      // mb: 1.5,
      color: colors.WHITE_COLOR,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    }}
  >
    Create New Customer
  </Typography>
</Paper>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <Box sx={{ flex: 1, minWidth: "300px" }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 2, color: colors.SOLUTYICS_PURPLE }}
            >
              Customer Information
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Full Name *"
                size="small"
                required
                fullWidth
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                size="small"
                fullWidth
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <TextField
                label="Phone Number"
                type="tel"
                size="small"
                fullWidth
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </Box>
          </Box>

          <Box sx={{ flex: 1, minWidth: "300px" }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 2, color: colors.SOLUTYICS_PURPLE }}
            >
              Address Details
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Billing Address"
                size="small"
                fullWidth
                multiline
                rows={3}
                value={formData.billing_address}
                onChange={(e) =>
                  handleChange("billing_address", e.target.value)
                }
              />
              <TextField
                label="Shipping Address"
                size="small"
                fullWidth
                multiline
                rows={3}
                value={formData.shipping_address}
                onChange={(e) =>
                  handleChange("shipping_address", e.target.value)
                }
              />
            </Box>
          </Box>
        </Box>

        {/* Submit Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <CreateCustomerButton type="submit" />
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        <SearchCustomer />
      </Box>
    </>
  );
};

export default Customer;
