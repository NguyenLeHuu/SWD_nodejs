const mongoose = require('mongoose');

const {Schema} = mongoose;

const ProductSchema = Schema({
    name: String,
})

const ProductModel = mongoose.model('Product',ProductSchema,"products")

module.exports=ProductModel;





