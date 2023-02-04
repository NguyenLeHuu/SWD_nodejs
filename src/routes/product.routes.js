const express = require('express');
const ProductController = require('../controllers/product.controller.js');

const router = express.Router();

router.get("/", (req, res) => ProductController.getAllProducts());

module.exports = router;