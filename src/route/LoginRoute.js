const express = require('express');
const LoginController = require('../controllers/LoginController')

let route =  express.Router();

route.post("/", LoginController.checkUserAccount)
.post("/refreshToken", LoginController.refreshToken);

module.exports = route;