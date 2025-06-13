// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Box, TextField, Grid, Typography } from "@mui/material";
// import { CreateCustomer } from "../../thunks/Api";
// import CreateCustomerButton from "../../Button/CreateCustomerButoon";
// import { colors } from "../../Globle/colors";
// import SearchCustomer from "./SearchCustomer";

// const Customer = () => {
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     billing_address: "",
//     shipping_address: "",
//   });

//   const handleChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(CreateCustomer(formData));
//     console.log("Customer Payload:", formData);
//   };

//   return (
//     <>
//       <Box>
//         <Typography
//           variant="h5"
//           sx={{ fontWeight: "bold", mb: 4, color: colors.SOLUTYICS_PURPLE }}
//         >
//           Create New Customer
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Name *"
//                 required
//                 fullWidth
//                 value={formData.name}
//                 onChange={(e) => handleChange("name", e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Email"
//                 type="email"
//                 fullWidth
//                 value={formData.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Phone"
//                 fullWidth
//                 value={formData.phone}
//                 onChange={(e) => handleChange("phone", e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Billing Address"
//                 fullWidth
//                 multiline
//                 rows={3}
//                 value={formData.billing_address}
//                 onChange={(e) => handleChange("billing_address", e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Shipping Address"
//                 fullWidth
//                 multiline
//                 rows={3}
//                 value={formData.shipping_address}
//                 onChange={(e) => handleChange("shipping_address", e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} sx={{ mt: 2 }}>
//               <CreateCustomerButton onClick={handleSubmit} />
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>

//       <Box sx={{ mt: 8 }}>
//         <SearchCustomer />
//       </Box>
//     </>
//   );
// };

// export default Customer;

import React, { useState } from "react";
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
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: colors.SOLUTYICS_PURPLE,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Create New Customer
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Name *"
                size="small"
                required
                fullWidth
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Email"
                type="email"
                size="small"
                fullWidth
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Phone"
                size="small"
                fullWidth
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Billing Address"
                size="small"
                fullWidth
                multiline
                rows={2}
                value={formData.billing_address}
                onChange={(e) =>
                  handleChange("billing_address", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Shipping Address"
                size="small"
                fullWidth
                multiline
                rows={2}
                value={formData.shipping_address}
                onChange={(e) =>
                  handleChange("shipping_address", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "right", mt: 2 }}>
              <CreateCustomerButton onClick={handleSubmit} />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Box sx={{ mt: 6 }}>
        <SearchCustomer />
      </Box>
    </>
  );
};

export default Customer;


