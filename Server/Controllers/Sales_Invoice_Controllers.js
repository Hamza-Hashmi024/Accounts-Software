const db = require("../config/db");

const createInvoice = (req, res) => {
  // Debug: Log the incoming request body
  console.log("Received payload:", req.body);

  const { invoice, items } = req.body;

  if (
    !invoice ||
    !items ||
    !Array.isArray(items) ||
    items.length === 0 ||
    !invoice.invoice_number ||
    !invoice.customer_id ||
    !invoice.invoice_date
  ) {
    console.error(
      "Validation Error: Missing required invoice data or invoice items"
    );
    return res
      .status(400)
      .json({ error: "Missing required invoice data or invoice items" });
  }

  const {
    invoice_number,
    customer_id,
    invoice_date,
    due_date,
    status,
    reference_number,
    notes,
    subtotal,
    total_discount,
    total_tax,
    shipping_fee,
    grand_total,
    amount_paid,
    amount_due,
  } = invoice;

  const invoiceQuery = `
    INSERT INTO invoices (
      invoice_number, customer_id, invoice_date, due_date, status,
      reference_number, notes, subtotal, total_discount, total_tax,
      shipping_fee, grand_total, amount_paid, amount_due
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const invoiceValues = [
    invoice_number,
    customer_id,
    invoice_date,
    due_date,
    status,
    reference_number,
    notes,
    subtotal,
    total_discount,
    total_tax,
    shipping_fee,
    grand_total,
    amount_paid,
    amount_due,
  ];

  db.beginTransaction((err) => {
    if (err) {
      console.error("Transaction Error:", err.message);
      return res
        .status(500)
        .json({ error: "Transaction error: " + err.message });
    }

    db.query(invoiceQuery, invoiceValues, (err, result) => {
      if (err) {
        console.error("Invoice Insert Error:", err.message);
        return db.rollback(() => {
          return res
            .status(500)
            .json({ error: "Failed to create invoice: " + err.message });
        });
      }

      const invoiceId = result.insertId;
      console.log("Invoice inserted with ID:", invoiceId);

      const itemQuery = `
        INSERT INTO invoice_items (
          invoice_id, product_id, description, quantity,
          unit_price, discount, tax, line_total
        ) VALUES ?
      `;

      const itemValues = items.map((item) => [
        invoiceId,
        item.product_id,
        item.description || null,
        item.quantity,
        item.unit_price,
        item.discount || 0.0,
        item.tax || 0.0,
        item.line_total,
      ]);

      db.query(itemQuery, [itemValues], (err) => {
        if (err) {
          console.error("Invoice Items Insert Error:", err.message);
          return db.rollback(() => {
            return res.status(500).json({
              error: "Failed to insert invoice items: " + err.message,
            });
          });
        }

        db.commit((err) => {
          if (err) {
            console.error("Commit Error:", err.message);
            return db.rollback(() => {
              return res
                .status(500)
                .json({ error: "Transaction commit failed: " + err.message });
            });
          }

          console.log("Invoice and items committed successfully!");
          res.status(201).json({
            message: "Invoice created successfully",
            invoice_id: invoiceId,
          });
        });
      });
    });
  });
};

// Get invoice by ID (with items)
const getInvoiceById = (req, res) => {
  const { id } = req.params;

  const invoiceQuery = `SELECT * FROM invoices WHERE id = ?`;
  const itemsQuery = `SELECT * FROM invoice_items WHERE invoice_id = ?`;

  db.query(invoiceQuery, [id], (err, invoiceResults) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error fetching invoice: " + err.message });
    }
    if (invoiceResults.length === 0) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    db.query(itemsQuery, [id], (err, itemResults) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error fetching invoice items: " + err.message });
      }

      res.status(200).json({
        invoice: invoiceResults[0],
        items: itemResults,
      });
    });
  });
};

// Create a single invoice item
const createInvoiceItem = (req, res) => {
  const {
    invoice_id,
    product_id,
    description,
    quantity,
    unit_price,
    discount,
    tax,
    line_total,
  } = req.body;

  if (!invoice_id || !product_id || !quantity || !unit_price || !line_total) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
    INSERT INTO invoice_items 
    (invoice_id, product_id, description, quantity, unit_price, discount, tax, line_total)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      invoice_id,
      product_id,
      description,
      quantity,
      unit_price,
      discount,
      tax,
      line_total,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting invoice item:", err.message);
        return res.status(500).json({ error: "Database error" });
      }

      res.status(201).json({
        message: "Invoice item created successfully",
        item_id: result.insertId,
      });
    }
  );
};
// Get all items for a specific invoice
const getInvoiceItemsByInvoiceId = (req, res) => {
  const { invoice_id } = req.params;

  const query = `SELECT * FROM invoice_items WHERE invoice_id = ?`;

  db.query(query, [invoice_id], (err, results) => {
    if (err) {
      console.error("Error fetching invoice items:", err.message);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(200).json(results);
  });
};

const getNextInvoiceData = async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query("SELECT MAX(id) AS lastId FROM invoices");

    const nextId = (rows[0].lastId || 0) + 1;

    const nextInvoiceNumber = `INV-${String(nextId).padStart(6, "0")}`;
    const nextReferenceNumber = `REF-${String(nextId).padStart(6, "0")}`;

    return res.json({
      success: true,
      invoice_number: nextInvoiceNumber,
      reference_number: nextReferenceNumber,
    });
  } catch (err) {
    console.error("Error generating invoice numbers:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to generate invoice/reference number",
    });
  }
};

const GetSalesAverage = (req, res) => {
  const query = `
    SELECT 
      AVG(grand_total) AS average_sales
    FROM 
      invoices
    WHERE 
      status != 'Draft';
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error occurred in GetSalesAverage:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const average = result[0]?.average_sales || 0;

    res.status(200).json({
      message: "Sales average fetched successfully",
      average_sales: average,
    });
  });
};

const GetTotalRevenue = (req, res) => {
  const query = `
    SELECT 
      SUM(grand_total) AS total_revenue
    FROM 
      invoices
    WHERE 
      status != 'Draft';
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error in GetTotalRevenue:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    res.status(200).json({
      message: "Total revenue fetched successfully",
      data: result[0],
    });
  });
};

const TotalProductSold = (req, res) => {
  const query = `
    SELECT 
      SUM(quantity) AS total_products_sold
    FROM 
      invoice_items
    WHERE 
      invoice_id IN (
        SELECT id FROM invoices WHERE status != 'Draft'
      );
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error in TotalProductSold:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(200).json({
      message: "Total products sold retrieved successfully",
      total_products_sold: result[0].total_products_sold || 0,
    });
  });
};

const GetToatalInvoiceNum = (req, res) => {
  const query = `
  SELECT COUNT(*) AS total_invoices FROM invoices WHERE status != 'Draft';
  `;
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error in GetToatalInvoiceNum:", err);
      return res.status(500).json({ error: "Database error", details: err });
    } else {
      res.status(200).json({
        message: "Total invoices retrieved successfully",
        total_invoices: result[0].total_invoices || 0,
      });
    }
  });
};

const GetSalesGrowth = (req, res) => {
  const query = `SELECT
  ROUND(
    (
      (this_month.total - last_month.total) / 
      NULLIF(last_month.total, 0)
    ) * 100, 2
  ) AS sales_growth_percentage
FROM
  (
    SELECT SUM(grand_total) AS total
    FROM invoices
    WHERE 
      status != 'Draft'
      AND MONTH(invoice_date) = MONTH(CURRENT_DATE())
      AND YEAR(invoice_date) = YEAR(CURRENT_DATE())
  ) AS this_month,
  (
    SELECT SUM(grand_total) AS total
    FROM invoices
    WHERE 
      status != 'Draft'
      AND MONTH(invoice_date) = MONTH(CURRENT_DATE() - INTERVAL 1 MONTH)
      AND YEAR(invoice_date) = YEAR(CURRENT_DATE() - INTERVAL 1 MONTH)
  ) AS last_month;`;
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error in GetSalesGrowth:", err);
      return res.status(500).json({ error: "Database error", details: err });
    } else {
      res.status(200).json({
        message: "Sales growth percentage retrieved successfully",
        sales_growth_percentage: result[0].sales_growth_percentage || 0,
      });
    }
  });
};

const MonthlySalesController = async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT 
        DATE_FORMAT(invoice_date, '%b') AS month,
        SUM(grand_total) AS revenue
      FROM invoices
      WHERE status != 'Draft'
      GROUP BY DATE_FORMAT(invoice_date, '%b')
      ORDER BY MIN(invoice_date)
    `);

    res.status(200).json({
      success: true,
      data: rows,
    });

  } catch (error) {
    console.error("Monthly Sales Query Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error while fetching monthly sales data",
    });
  }
};

const GetAllInvoices = (req , res ) =>{
  
  db.query("SELECT * FROM invoices", (err, result) =>{
    if (err){
      console.error("Error in Get Invoices:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }else{
      res.status(200).json({
        message: "Invoices retrieved successfully",
        data: result
      })
    }
  })
}



const GetInvoiceById = (req, res) => {
  const invoiceId = req.params.id;

  if (!invoiceId) {
    return res.status(400).json({ message: "Invoice ID is required." });
  }

  db.query(`
    SELECT i.*, c.name AS customer_name, c.email AS customer_email, c.phone AS customer_phone
    FROM invoices i
    JOIN customers c ON i.customer_id = c.id
    WHERE i.id = ?
  `, [invoiceId], (err, invoiceRows) => {
    if (err) {
      console.error("GetInvoiceById Error:", err);
      return res.status(500).json({ message: "Error fetching invoice" });
    }

    if (invoiceRows.length === 0) {
      return res.status(404).json({ message: "Invoice not found." });
    }

    const invoice = invoiceRows[0];

    db.query(`
      SELECT ii.*, p.name AS product_name 
      FROM invoice_items ii
      JOIN products p ON ii.product_id = p.id
      WHERE ii.invoice_id = ?
    `, [invoiceId], (err2, itemsRows) => {
      if (err2) {
        console.error("GetInvoiceById Error:", err2);
        return res.status(500).json({ message: "Error fetching invoice items" });
      }

      const fullInvoice = {
        id: invoice.id,
        invoice_number: invoice.invoice_number,
        invoice_date: invoice.invoice_date,
        due_date: invoice.due_date,
        status: invoice.status,
        reference_number: invoice.reference_number,
        notes: invoice.notes,
        subtotal: invoice.subtotal,
        total_discount: invoice.total_discount,
        total_tax: invoice.total_tax,
        shipping_fee: invoice.shipping_fee,
        grand_total: invoice.grand_total,
        amount_paid: invoice.amount_paid,
        amount_due: invoice.amount_due,
        customer: {
          id: invoice.customer_id,
          name: invoice.customer_name,
          email: invoice.customer_email,
          phone: invoice.customer_phone
        },
        items: itemsRows.map(item => ({
          id: item.id,
          product_name: item.product_name,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          discount: item.discount,
          tax: item.tax,
          line_total: item.line_total
        }))
      };

      res.json({ invoice: fullInvoice });
    });
  });
};





module.exports = {
  createInvoice,
  getInvoiceById,
  getInvoiceItemsByInvoiceId,
  createInvoiceItem,
  getNextInvoiceData,
  GetSalesAverage,
  GetTotalRevenue,
  TotalProductSold,
  GetToatalInvoiceNum,
  GetSalesGrowth,
  MonthlySalesController,
  GetAllInvoices,
  GetInvoiceById
};

