const express = require('express');
const router = express.Router();
const controller = require('../controllers/locationController');

router.get("/", controller.getAllLocations);
router.get("/:id", controller.getSingleLocation);
router.post("/", controller.createLocation);
router.put("/:id", controller.updateLocation);
router.delete("/:id", controller.deleteLocation);

module.exports = router;
