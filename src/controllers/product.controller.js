const ProductService = require('../services/product.service.js');
const ProductController = {};

ProductController.getAllProducts = (req, res) => {
    try {
        const products = ProductService.getAllProducts;
        res.status(200).json({
            products: products,
        });
    } catch (error) {
        res.status(400);
    }
}

module.exports= ProductController;