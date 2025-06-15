const express = require('express');
const router = express.Router();
const ReciveableControllers = require("../Controllers/ReciveableControllers")

router.get("/recivable" ,  ReciveableControllers. getReceivables)

module.exports = router


