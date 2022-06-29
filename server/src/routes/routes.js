const express = require("express");
const router = express.Router();
const controller = require("../controller/proController");
///product api
router.get("/displayProduct", controller.displayProduct);

module.exports = router;
