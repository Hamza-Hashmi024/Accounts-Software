const express = require('express');
const router = express.Router();
const SalesController = require('../Controllers/Sales_Invoice_Controllers');


router.post('/invoice', SalesController.createInvoice);
router.get('/invoice/:id', SalesController.getInvoiceById);
router.post('/invoice-item', SalesController.createInvoiceItem);
router.get('/invoice-item/:invoice_id', SalesController.getInvoiceItemsByInvoiceId);
router.get('/number', SalesController.getNextInvoiceData);
router.get('/averge' , SalesController.GetSalesAverage);
router.get('/totalrevenue' ,  SalesController.GetTotalRevenue);
router.get('/soldproducts' ,  SalesController.TotalProductSold);
router.get('/totalNumInvoices' , SalesController.GetToatalInvoiceNum);
router.get('/salesGrowth' ,  SalesController.GetSalesGrowth)
router.get('/monthlysales' ,  SalesController.MonthlySalesController)


module.exports = router;