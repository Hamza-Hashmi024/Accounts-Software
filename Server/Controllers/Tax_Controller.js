const db = require("../config/db");

const getAllTaxes = (req, res) => {
  const query = "SELECT id, name, rate , description , created_at FROM taxes";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching taxes:", err.message);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

const createTax = (req, res) => {
  const { name, rate, description } = req.body;

  const query = `
    INSERT INTO taxes (name, rate, description)
    VALUES (?, ?, ?)
  `;

  db.query(query, [name, rate, description], (err, results) => {
    if (err) {
      console.error("Error creating tax:", err.message);
      return res.status(500).json({ error: "Failed to create tax record" });
    }

    res.status(201).json({
      message: "Tax created successfully",
      data: {
        id: results.insertId,
        name,
        rate,
        description,
      },
    });
  });
};

const UpdateTax = (req, res) => {
  const { id } = req.params;
  const { name, rate, description } = req.body;

  const query = `UPDATE taxes SET name = ?, rate = ?, description = ? WHERE id = ?`;
  db.query(query, [name, rate, description, id], (err, results) => {
    if (err) {
      console.log("Error Occurred While Updating Tax", err);
      return res.status(500).json({ error: "Failed to Update Tax Record" });
    } else {
      res.json({ message: "Tax Updated Successfully", data: results });
    }
  });
};

module.exports = {
  getAllTaxes,
  createTax,
  UpdateTax
};
