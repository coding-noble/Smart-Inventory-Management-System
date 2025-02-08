const express = require("express");
const router = express.Router();

// Sample Product Data
const products = [
    { name: "Laptop", location: "Warehouse A", stock: 5 },
    { name: "Mouse", location: "Warehouse B", stock: 20 },
    { name: "Keyboard", location: "Warehouse C", stock: 3 },
    { name: "Monitor", location: "Warehouse A", stock: 12 },
];

// Calculate Stock Summary
router.get("/products", (req, res) => {
    const totalItems = products.reduce((sum, p) => sum + p.stock, 0);
    const totalStock = Math.round((totalItems / 100) * 100); // Mock percentage
    const lowStockCount = Math.round((products.filter(p => p.stock < 10).length / products.length) * 100);
    const recentLocation = products.length > 0 ? products[products.length - 1].location : null;

    res.json({ products, totalStock, lowStockCount, recentLocation });
});

module.exports = router;

