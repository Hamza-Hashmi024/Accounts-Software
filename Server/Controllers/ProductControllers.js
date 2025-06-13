const db = require("../config/db");

// CREATE Product
// const createProduct = (req, res) => {
//   const { name, description, price, tax_rate } = req.body;

//   if (!name || !price) {
//     return res.status(400).json({ error: "Name and price are required" });
//   }

//   const query = `
//     INSERT INTO products (name, description, price, tax_rate)
//     VALUES (?, ?, ?, ?)
//   `;

//   db.query(query, [name, description, price, tax_rate || 0], (err, result) => {
//     if (err) {
//       console.error("Error creating product:", err.message);
//       return res.status(500).json({ error: "Database error" });
//     }

//     res
//       .status(201)
//       .json({ message: "Product created", product_id: result.insertId });
//   });
// };

const createProduct = (req, res) => {
  const { name, description, price, tax_id } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  const query = `
    INSERT INTO products (name, description, price, tax_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [name, description, price, tax_id || null], (err, result) => {
    if (err) {
      console.error("Error creating product:", err.message);
      return res.status(500).json({ error: err.message });
    }

    res
      .status(201)
      .json({ message: "Product created", product_id: result.insertId });
  });
};



// READ ALL Products
const getAllProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("Error fetching products:", err.message);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(200).json(results);
  });
};

// READ SINGLE Product by ID (with tax name)
const getProductById = (req, res) => {
  const { id } = req.params;

  const query = `
 SELECT 
  p.id,
  p.name,
  p.description,
  p.price,
  p.created_at,
  p.updated_at,
  t.name AS tax_name,
  t.rate AS tax_rate
FROM 
  products p
LEFT JOIN 
  taxes t ON p.tax_id = t.id
WHERE 
  p.id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching product:", err.message);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(results[0]); // Includes tax_name now
  });
};

// UPDATE Product

const updateProduct = (req, res) => {
  const { id } = req.params;

  // Validate request body
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  const { name, description, price, tax_rate } = req.body;

  // Optional: Validate fields (basic)
  if (!name || !description || price == null || tax_rate == null) {
    return res.status(400).json({ error: "All product fields are required" });
  }

  const query = `
    UPDATE products 
    SET name = ?, description = ?, price = ?, tax_rate = ?
    WHERE id = ?
  `;

  db.query(query, [name, description, price, tax_rate, id], (err, result) => {
    if (err) {
      console.error("Error updating product:", err.message);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  });
};

// Delete Product
const deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting product:", err.message);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted" });
  });
};

const getNextProductId = (req, res) => {
  const query = `
    SELECT AUTO_INCREMENT
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = 'accounting' AND TABLE_NAME = 'products';
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!results || results.length === 0)
      return res.status(404).json({ error: "Table not found" });

    const nextId = results[0].AUTO_INCREMENT;
    res.status(200).json({ nextId });
  });
};

const GetProductSalesOverview = (req, res) => {
  const query = `
    SELECT 
      p.name AS name,
      SUM(ii.quantity) AS sales
    FROM invoice_items ii
    INNER JOIN products p ON ii.product_id = p.id
    GROUP BY ii.product_id
    ORDER BY sales DESC
    LIMIT 10;
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching product sales:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve product sales overview",
      });
    }

    res.status(200).json({
      success: true,
      data: results,
    });
  });
};


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getNextProductId,
  GetProductSalesOverview
};
