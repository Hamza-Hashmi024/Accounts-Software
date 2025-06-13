const db = require("../config/db"); 

const getAllTaxes = (req, res) => {
  const query = "SELECT id, name, rate FROM taxes";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching taxes:", err.message);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

module.exports = {
  getAllTaxes,
};