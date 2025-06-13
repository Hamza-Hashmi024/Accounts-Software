const express = require('express');
const router = express.Router();
const ProductController = require('../Controllers/ProductControllers');

router.post('/product', ProductController.createProduct);
router.get('/products', ProductController.getAllProducts);
router.get('/product/:id', ProductController.getProductById);
router.put('/product/:id', ProductController.updateProduct);
router.delete('/product/:id', ProductController.deleteProduct);
router.get('/next-id', ProductController.getNextProductId);  
router.get('/productOverview' ,  ProductController.GetProductSalesOverview)



module.exports = router;