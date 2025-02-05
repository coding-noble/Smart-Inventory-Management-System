const express = require("express");
const router = express.Router();

// Sample Product Data
const products = [
    { name: "Laptop", location: "Warehouse A", stock: 5 },
    { name: "Mouse", location: "Warehouse B", stock: 20 },
    { name: "Keyboard", location: "Warehouse C", stock: 3 },
    { name: "Monitor", location: "Warehouse A", stock: 12 },
];

// API Route to Send Product Data
router.get("/api/products", (req, res) => {
    res.json(products);
});

module.exports = router;
