const express = require('express');
const router = express.Router();
const ReciveableControllers = require("../Controllers/ReciveableControllers")

router.get("/recivable" ,  ReciveableControllers. getReceivables);
router.get("/" , ReciveableControllers.getCreditInvoices );

module.exports = router


