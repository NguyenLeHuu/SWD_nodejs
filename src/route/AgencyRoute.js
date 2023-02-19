const express = require("express");
const AgencyController = require("../controllers/AgencyController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

let route = express.Router();

route.get(
  "/test",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isAdmin,
  AgencyController.index
);

module.exports = route;
