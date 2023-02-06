const express = require('express');
const AgencyController = require('../controllers/AgencyController')

let route =  express.Router();

// route.get('/test',UserController.test);
route.get("/test", AgencyController.index);

module.exports = route;