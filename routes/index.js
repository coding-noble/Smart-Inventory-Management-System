const express = require("express");

const router = express.Router();

// Register routes
router.use("/", require("./swaggerRoutes"));
router.use("/products", require("./productRoutes"));
router.use("/locations", require("./locationRoutes"));

module.exports = router;