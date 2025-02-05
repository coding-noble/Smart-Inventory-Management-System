const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const authentication = require("../authentication/authorizationMiddleware");

router.use("/api-docs", authentication.isAuthenticated, authentication.isEmployee, swaggerUi.serve);
router.use("/api-docs", authentication.isAuthenticated, authentication.isEmployee, swaggerUi.setup(swaggerDocument));

module.exports = router;