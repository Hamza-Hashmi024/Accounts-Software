import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { colors } from "../../Globle/colors";
import Chip from "@mui/material/Chip";
import { lighten } from "@mui/material/styles";
import {
  GetSalesRevenew,
  TotalProductSold,
  TotalInvoice,
  GetTotalCustomerNum,
  GetSalesGrowth,
  GetSalesAverage,
  GetMonthlySalesOverView,
  GetProductSalesOverView,
} from "../../thunks/Api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Sales = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    isError,
    revenueData,
    totalInvoices,
    salesGrowth,
    salesAverage,
    monthlySales,
  } = useSelector((state) => state.SalesInvoice);

  const {
    isLoading: productLoading,
    error: productError,
    totalProductSold,
    productSalesOverView,
  } = useSelector((state) => state.Product);

  const { loading, error, totalCustomerNum } = useSelector(
    (state) => state.Customer
  );
  // Metric cards data
  const metrics = [
    {
      icon: (
        <TrendingUpIcon fontSize="large" sx={{ color: colors.GREEN_COLOR }} />
      ),
      label: "Total Revenue",
      value: isLoading
        ? "Loading..."
        : isError
        ? "Error"
        : `$${Number(revenueData?.total_revenue || 0).toLocaleString()}`,
    },
    {
      icon: (
        <InventoryIcon fontSize="large" sx={{ color: colors.TEAL_COLOR }} />
      ),
      label: "Total Products Sold",
      value: productLoading
        ? "Loading..."
        : productError
        ? "Error"
        : `${totalProductSold?.total_products_sold || 0}`,
    },
    {
      icon: <ReceiptLongIcon fontSize="large" sx={{ color: colors.PURPLE }} />,
      label: "Total Invoices",
      value: isLoading
        ? "Loading..."
        : isError
        ? "Error"
        : `${totalInvoices?.total_invoices}`,
    },
    {
      icon: (
        <PersonAddIcon
          fontSize="large"
          sx={{ color: colors.SEA_GREEN_COLOR }}
        />
      ),
      label: "New Customers",
      value: loading
        ? "Loading..."
        : error
        ? "Error"
        : `${totalCustomerNum?.total_customers ?? 0}`,
    },
    {
      icon: (
        <ShowChartIcon fontSize="large" sx={{ color: colors.YELLOW_COLOR }} />
      ),
      label: "Sales Growth",
      value: isLoading
        ? "Loading..."
        : isError
        ? "Error"
        : `${Math.min(
            Number(salesGrowth?.sales_growth_percentage ?? 0),
            100
          )}%`,
    },
    {
      icon: (
        <ShoppingCartIcon
          fontSize="large"
          sx={{ color: colors.SOLUTYICS_PURPLE }}
        />
      ),
      label: "Avg Order Value",
      value: isLoading
        ? "Loading..."
        : isError
        ? "Error"
        : `$${Number(salesAverage?.average_sales || 0).toLocaleString()}`,
    },
  ];

  const revenue =
    monthlySales?.data?.map((item) => ({
      month: item.month,
      revenue: parseFloat(item.revenue),
    })) || [];

  // const productSales = [
  //   { name: "Product A", sales: 1200 },
  //   { name: "Product B", sales: 900 },
  //   { name: "Product C", sales: 500 },
  // ];

  const productSales = Array.isArray(productSalesOverView?.data)
    ? productSalesOverView.data.map((item) => ({
        name: item.name,
        sales: parseFloat(item.sales),
      }))
    : [];

  const pieData = [
    { name: "Online", value: 3200 },
    { name: "Offline", value: 1800 },
  ];

  const pieColors = [colors.SOLUTYICS_PURPLE, colors.SEA_GREEN_COLOR];

  useEffect(() => {
    dispatch(GetSalesRevenew());
    dispatch(TotalProductSold());
    dispatch(TotalInvoice());
    dispatch(GetTotalCustomerNum());
    dispatch(GetSalesGrowth());
    dispatch(GetSalesAverage());
    dispatch(GetMonthlySalesOverView());
    dispatch(GetProductSalesOverView());
  }, [dispatch]);

  return (
    <Box
    
     >
  <Paper
  elevation={0}
  sx={{
    backgroundColor: colors.SOLUTYICS_GRAY,
    p: 2,
    mb: 2
    
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
    Sales Overview
  </Typography>
</Paper>

      <Grid container spacing={2.5}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                display: "flex",
                alignItems: "center",
                gap: 2,
                backgroundColor: "#FFFFFF",
                borderLeft: `3px solid ${colors.SOLUTYICS_PURPLE}`,
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.08)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: `${colors.SOLUTYICS_PURPLE}15`,
                  color: colors.SOLUTYICS_PURPLE,
                  flexShrink: 0,
                }}
              >
                {metric.icon}
              </Box>

              <Box sx={{ overflow: "hidden" }}>
                <Typography
                  variant="overline"
                  component="div"
                  sx={{
                    color: colors.SOLUTYICS_GRAY,
                    letterSpacing: 0.8,
                    fontWeight: 500,
                    lineHeight: 1.2,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  {metric.label}
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    color: "#2D3748",
                    mt: 0.5,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {metric.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={8} margin={10}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              // borderRadius: "8px",
              // boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              height: "100%",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: colors.SOLUTYICS_PURPLE,
                  letterSpacing: "0.5px",
                }}
              >
                MONTHLY REVENUE TREND
              </Typography>
              <Chip
                label="YTD +12.4%"
                size="small"
                sx={{
                  backgroundColor: `${colors.GREEN_COLOR}15`,
                  color: colors.GREEN_COLOR,
                  fontWeight: 500,
                  fontSize: "0.75rem",
                }}
              />
            </Box>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart
                data={revenue}
                margin={{ top: 5, right: 20, bottom: 15, left: 10 }}
              >
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={colors.GREEN_COLOR}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={colors.GREEN_COLOR}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="#f0f0f0"
                  vertical={false}
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: colors.SOLUTYICS_GRAY }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: colors.SOLUTYICS_GRAY }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "6px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    padding: "10px",
                  }}
                  formatter={(value) => [
                    `$${Number(value).toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke={colors.GREEN_COLOR}
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    stroke: colors.GREEN_COLOR,
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                  activeDot={{ r: 6, fill: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  fill="url(#revenueGradient)"
                  strokeWidth={0}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: "100%",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: colors.SOLUTYICS_PURPLE,
                  letterSpacing: "0.5px",
                }}
              >
                PRODUCT SALES OVERVIEW
              </Typography>
              <Box>
                <Chip
                  label="Q3"
                  size="small"
                  sx={{
                    backgroundColor: `${colors.SOLUTYICS_PURPLE}15`,
                    color: colors.SOLUTYICS_PURPLE,
                    fontWeight: 500,
                    mr: 1,
                    fontSize: "0.75rem",
                  }}
                />
                <Chip
                  label="All Categories"
                  size="small"
                  sx={{
                    backgroundColor: "#f5f7f9",
                    color: colors.SOLUTYICS_GRAY,
                    fontWeight: 500,
                    fontSize: "0.75rem",
                  }}
                />
              </Box>
            </Box>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={productSales}
                margin={{ top: 5, right: 20, bottom: 15, left: 10 }}
              >
                <CartesianGrid
                  stroke="#f0f0f0"
                  vertical={false}
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: colors.SOLUTYICS_GRAY }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: colors.SOLUTYICS_GRAY }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "6px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    padding: "10px",
                  }}
                  cursor={{ fill: `${colors.TEAL_COLOR}10` }}
                  formatter={(value) => [value, "Units Sold"]}
                />
                <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
                  {productSales.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index % 2
                          ? colors.TEAL_COLOR
                          : lighten(colors.TEAL_COLOR, 0.3)
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Pie Chart */}
      <Box mt={6}>
        <Typography variant="h6" sx={{ mb: 2, color: colors.SOLUTYICS_PURPLE }}>
          Revenue Source Distribution
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              label
              outerRadius={100}
              fill={colors.SOLUTYICS_PURPLE}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={pieColors[index % pieColors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default Sales;
