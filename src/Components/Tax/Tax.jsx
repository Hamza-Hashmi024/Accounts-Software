import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Paper,
  TextField,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { CreateTax } from "../../thunks/Api";
import { colors } from "../../Globle/colors";
import TaxTable from "./TaxTable";
const Tax = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.Tax);

  const [formData, setFormData] = useState({
    name: "",
    rate: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CreateTax(formData));
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
          Add New TAX
        </Typography>
      </Paper>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 1500,
          // margin: "auto",
           justifyContent: "center",   // center horizontally
    alignItems: "center",  
          padding: 4,
          gap: 2,
          borderRadius: 2,
         
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>

        <div>
          {/* Tax Name */}
          <Grid item xs={12} md={4} sx={{mb: 2}}>
            <TextField
              name="name"
              label="Tax Name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Tax Rate */}
          <Grid item xs={12} md={4}>
            <TextField
              name="rate"
              label="Tax Rate (%)"
              type="number"
              inputProps={{ step: "0.01", min: "0", max: "100" }}
              variant="outlined"
              fullWidth
              value={formData.rate}
              onChange={handleChange}
              required
            />
          </Grid>
         </div>
          {/* Description */}
          <Grid item xs={12} md={4}>
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>

         
        </Grid>

         {/* Submit Button */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Create Tax"}
              </Button>
            </Box>
          </Grid>
      </Box>

      <TaxTable/>
    </>
  );
};

export default Tax;
