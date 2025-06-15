const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const SalesRouter = require("./routes/SalesRoutes");
const CustomerRouter = require("./routes/CustomerRoutes");
const ProductsRouter = require("./routes/ProductRoutes");
const TaxRouter = require("./routes/TaxRoutes");
const receivableRoutes = require("./routes/reciveableRoutes")
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
db.connect();

// Routes

app.use("/api/customer", CustomerRouter);
app.use("/api/sales", SalesRouter);
app.use("/api/product", ProductsRouter);
app.use("/api/tax", TaxRouter);
app.use("/api/reciveable", receivableRoutes)
 

app.get("/", (req, res) => {
  res.send(`Server s running ON Port   ${PORT}`);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on port  http://localhost:${PORT}`);
});
