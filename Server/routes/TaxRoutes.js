const express = require("express");
const router = express.Router();
const taxController = require("../Controllers/Tax_Controller");

router.get("/taxes", taxController.getAllTaxes);
router.post('/create' , taxController.createTax  );

module.exports = router;