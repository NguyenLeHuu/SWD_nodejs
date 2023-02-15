const express = require('express');
const AgencyController = require('../controllers/AgencyController')
const authenToken = require('../services/AuthenToken')

let route =  express.Router();

route.get("/test",authenToken,AgencyController.index);

module.exports = route;