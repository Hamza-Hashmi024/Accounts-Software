import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { CreateTax } from '../../thunks/Api'; 
const Tax = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.Tax);

  const [formData, setFormData] = useState({
    name: '',
    rate: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CreateTax(formData));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 400,
        margin: 'auto',
        padding: 4,
        border: '1px solid #ccc',
        borderRadius: 2,
        mt: 5
      }}
    >
      <Typography variant="h6">Enter Tax Details</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        name="name"
        label="Tax Name"
        variant="outlined"
        fullWidth
        value={formData.name}
        onChange={handleChange}
        required
      />

      <TextField
        name="rate"
        label="Tax Rate (%)"
        type="number"
        variant="outlined"
        fullWidth
        inputProps={{ step: "0.01", min: "0", max: "100" }}
        value={formData.rate}
        onChange={handleChange}
        required
      />

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

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Create Tax'}
      </Button>
    </Box>
  );
};

export default Tax;