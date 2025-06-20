const db = require("../config/db");

const getReceivables = async (req, res) => {
  try {
    const {
      invoice_id,
      due_date,
      from_date,
      to_date,
      customer_name,
      reference_number,
      payment_method,
    } = req.query;

    let query = `
      SELECT 
        invoices.id,
        invoices.invoice_number,
        invoices.due_date,
        invoices.amount_due,
        invoices.status,
        invoices.reference_number,
        invoices.payment_method,
        customers.name AS customer_name
      FROM invoices
      INNER JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount_due > 0
        AND invoices.transaction_type = 'credit'
    `;

    const queryParams = [];

    if (invoice_id) {
      query += ` AND invoices.id = ?`;
      queryParams.push(invoice_id);
    }

    if (due_date) {
      query += ` AND invoices.due_date LIKE ?`;
      queryParams.push(`${due_date}%`);
    }

    if (from_date && to_date) {
      query += ` AND invoices.due_date BETWEEN ? AND ?`;
      queryParams.push(from_date, to_date);
    }

    if (customer_name) {
      query += ` AND customers.name LIKE ?`;
      queryParams.push(`%${customer_name}%`);
    }

    if (reference_number) {
      query += ` AND invoices.reference_number LIKE ?`;
      queryParams.push(`%${reference_number}%`);
    }

    if (payment_method) {
      query += ` AND invoices.payment_method = ?`;
      queryParams.push(payment_method);
    }

    query += ` ORDER BY invoices.due_date ASC`;

    db.query(query, queryParams, (err, results) => {
      if (err) {
        console.error("Error fetching receivables:", err);
        return res.status(500).json({ error: "Failed to fetch receivables" });
      }
      return res.status(200).json(results);
    });
  } catch (error) {
    console.error("Unexpected server error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};





const getCreditInvoices = async (req, res) => {
  try {
    const {
      invoice_id,
      due_date,
      from_date,
      to_date,
      customer_name,
      reference_number
    } = req.query;

    let query = `
      SELECT 
        invoices.id,
        invoices.invoice_number,
        invoices.due_date,
        invoices.amount_due,
        invoices.status,
        invoices.reference_number,
        customers.name AS customer_name
      FROM invoices
      INNER JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.status = 'Credit'
    `;

    const queryParams = [];

    if (invoice_id) {
      query += ` AND invoices.id = ?`;
      queryParams.push(invoice_id);
    }

    if (due_date) {
      query += ` AND invoices.due_date LIKE ?`;
      queryParams.push(`${due_date}%`);
    }

    if (from_date && to_date) {
      query += ` AND invoices.due_date BETWEEN ? AND ?`;
      queryParams.push(from_date, to_date);
    }

    if (customer_name) {
      query += ` AND customers.name LIKE ?`;
      queryParams.push(`%${customer_name}%`);
    }

    if (reference_number) {
      query += ` AND invoices.reference_number LIKE ?`;
      queryParams.push(`%${reference_number}%`);
    }

    query += ` ORDER BY invoices.due_date ASC`;

    db.query(query, queryParams, (err, results) => {
      if (err) {
        console.error("Error fetching credit invoices:", err);
        return res.status(500).json({ error: "Failed to fetch credit invoices" });
      }
      return res.status(200).json(results);
    });
  } catch (error) {
    console.error("Unexpected server error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  getReceivables,
  getCreditInvoices
};