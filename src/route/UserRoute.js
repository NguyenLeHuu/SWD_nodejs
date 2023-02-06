const express = require('express');
const UserController = require('../controllers/UserController')

let route =  express.Router();

// route.get('/test',UserController.test);
route.get("/test", UserController.index);

module.exports = route;