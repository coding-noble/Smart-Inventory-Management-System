const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const authentication = require("../authentication/authorizationMiddleware");

router.get('/', authentication.isAuthenticated, authentication.isUser, controller.getAllUsers);
router.get('/:id', authentication.isAuthenticated, authentication.isUser, controller.getSingleUser);
router.post('/', authentication.isAuthenticated, authentication.isEmployee, controller.createUser);
router.put('/:id', authentication.isAuthenticated, authentication.isEmployee, controller.updateUser);
router.put('/upgrade/:id', authentication.isAuthenticated, authentication.isAdmin, controller.updateUsersAccessLevel);
router.delete('/:id', authentication.isAuthenticated, authentication.isAdmin, controller.deleteUser);

module.exports = router;