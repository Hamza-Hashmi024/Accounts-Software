const express = require("express");
const router = express.Router();
const taxController = require("../Controllers/Tax_Controller");

router.get("/taxes", taxController.getAllTaxes);
router.post("/create", taxController.createTax);
router.put("/update/:id", taxController.UpdateTax);

module.exports = router;

