import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetTax } from "../../thunks/Api";
import { MdDelete } from "react-icons/md";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { colors } from "../../Globle/colors";
import { CiEdit } from "react-icons/ci";

const TaxTable = () => {
  const dispatch = useDispatch();
  const { taxes, loading, error } = useSelector((state) => state.Tax);

  useEffect(() => {
    dispatch(GetTax());
  }, [dispatch]);

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Tax List
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : taxes.length === 0 ? (
        <Typography>No taxes found.</Typography>
      ) : (
        <Table>
          <TableHead
            sx={{
              backgroundColor: colors.SOLUTYICS_GRAY,
              "& .MuiTableCell-head": {
                color: colors.WHITE_COLOR,
                fontWeight: "bold",
              },
            }}
          >
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Rate (%)</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell> Action </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taxes.map((tax) => (
              <TableRow key={tax.id}>
                <TableCell>{tax.id}</TableCell>
                <TableCell>{tax.name}</TableCell>
                <TableCell>{parseFloat(tax.rate).toFixed(2)}%</TableCell>
                <TableCell>{tax.description || "-"}</TableCell>
                <TableCell>
                  {new Date(tax.created_at).toLocaleString()}
                </TableCell>

                <TableCell
                  className="cursor-pointer"
                  sx={{
                    color: colors.GREEN_COLOR,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: "bold",
                  }}
                >
                  <CiEdit /> Edit
                </TableCell>
                <TableCell
                  className="cursor-pointer"
                  sx={{
                    color: colors.RED_COLOR,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: "bold",
                  }}
                >
                  <MdDelete /> Delete
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default TaxTable;
