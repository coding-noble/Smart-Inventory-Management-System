const express = require('express');
const router = express.Router();
const controller = require('../controllers/locationController');
const authentication = require("../authentication/authorizationMiddleware");

router.get("/", authentication.isAuthenticated, authentication.isUser, controller.getAllLocations);
router.get("/:id", authentication.isAuthenticated, authentication.isUser, controller.getSingleLocation);
router.post("/", authentication.isAuthenticated, authentication.isEmployee, controller.createLocation);
router.put("/:id", authentication.isAuthenticated, authentication.isEmployee, controller.updateLocation);
router.delete("/:id", authentication.isAuthenticated, authentication.isAdmin, controller.deleteLocation);

module.exports = router;
