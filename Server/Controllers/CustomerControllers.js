const db = require("../config/db");

const createCustomer = (req, res) => {
  const {
    name,
    email,
    phone,
    billing_address,
    shipping_address,
    created_at,
    updated_at,
  } = req.body;

  const query = `
    INSERT INTO customers
    (name, email, phone, billing_address, shipping_address, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?) `;

  db.query(
    query,
    [
      name,
      email,
      phone,
      billing_address,
      shipping_address,
      created_at,
      updated_at,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting customer:", err.message);
        return res.status(500).json({ error: "Database error" });
      }

      res.status(201).json({
        message: "Customer created successfully",
        id: result.insertId,
      });
    }
  );
};

// const getCustomer = (req, res) => {
//   const { id } = req.params;

//   const query = `SELECT * FROM customers WHERE id = ?`;

//   db.query(query, [id], (err, results) => {
//     if (err) {
//       console.error('Error fetching customer:', err.message);
//       return res.status(500).json({ error: 'Database error' });
//     } else if (results.length === 0) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }

//     res.status(200).json(results[0]);
//   });
// };

const getCustomerByIdOrName = (req, res) => {
  const { id, name } = req.query;

  if (!id && !name) {
    return res
      .status(400)
      .json({ error: "Please provide id or name to search" });
  }

  let query = "SELECT * FROM customers WHERE ";
  const params = [];

  if (id) {
    query += "id = ?";
    params.push(id);
  }

  if (name) {
    if (id) query += " OR ";
    query += "name = ?";
    params.push(name);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching customer:", err.message);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(results);
  });
};

// // get Al  customer
// const getAllCustomers = (req, res) => {
//   const query = "SELECT * FROM customers";
//   db.query(query, (err, results) => {
//     if (err) {
//       console.log("Error fetching Cistomers :", err.message);
//     } else res.status(200).json(results);
//   });
// };

const getAllCustomers = (req, res) => {
  let { id, name } = req.query;

  // Trim any potential spaces and check for non-empty values
  id = id?.trim();
  name = name?.trim();

  const hasId = id && id !== "";
  const hasName = name && name !== "";

  if (!hasId && !hasName) {
    // No filters - return all
    const query = "SELECT * FROM customers";
    db.query(query, (err, results) => {
      if (err) {
        console.log("Error fetching all customers:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(200).json(results);
    });
  } else {
    // Filtered query
    const query = `
      SELECT * FROM customers 
      WHERE ${hasId ? "id = ?" : ""} 
      ${hasId && hasName ? "OR" : ""} 
      ${hasName ? "name LIKE ?" : ""}
    `;
    const params = [];
    if (hasId) params.push(id);
    if (hasName) params.push(`%${name}%`);

    db.query(query, params, (err, results) => {
      if (err) {
        console.log("Error searching customers:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(200).json(results);
    });
  }
};

const updateCustomerById = (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  console.log("Payload:", { name, email, id }); // Add this for debugging

  if (!name || !email || !id) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const query = "UPDATE customers SET name = ?, email = ? WHERE id = ?";
  const values = [name, email, id];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Failed to update customer" });
    }
    res.json({ message: "Customer updated", results });
  });
};

const DeleteCustomerById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Customer ID is required" });
  }

  const query = "DELETE FROM customers WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error Deleting Customer:", err);
      return res.status(500).json({ error: "Failed to delete customer" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  });
};

const getCustomerName = (req, res) => {
  const query = "SELECT id, name FROM customers ORDER BY name ASC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching customer names:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
};

const GetTotalNumOfCustomers = (req, res) => {
  const query = "SELECT COUNT(*) AS total_customers FROM customers";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching total number of customers:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const totalCustomers = results[0]?.total_customers || 0;
    res.status(200).json({ total_customers: totalCustomers });
  });
};
module.exports = {
  createCustomer,
  getCustomerByIdOrName,
  getAllCustomers,
  updateCustomerById,
  DeleteCustomerById,
  getCustomerName,
  GetTotalNumOfCustomers
};
