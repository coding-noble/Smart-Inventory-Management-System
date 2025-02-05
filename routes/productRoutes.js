const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const authentication = require("../authentication/authorizationMiddleware");

router.get('/', authentication.isAuthenticated, authentication.isUser, controller.getAllProducts);
router.get('/:id', authentication.isAuthenticated, authentication.isUser, controller.getSingleProduct);
router.post('/', authentication.isAuthenticated, authentication.isEmployee, controller.createProduct);
router.put('/:id', authentication.isAuthenticated, authentication.isEmployee, controller.updateProduct);
router.delete('/:id', authentication.isAuthenticated, authentication.isAdmin, controller.deleteProduct);

module.exports = router;
