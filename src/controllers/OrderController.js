const { RedshiftData } = require("aws-sdk");
const OrderService = require("../services/OrderService");
const redis = require("../services/redis");

module.exports = {
  async index(req, res) {
    /* 
        #swagger.tags = ['Order/Cart']
         #swagger.description = "Get all order by customer id"
        */
    try {
      const id = req.params["id"];
      let data = await OrderService.getAll(id);

      return res.status(200).json({
        status: 200,
        message: "Get list order/cart by customer id successful!",
        data: data,
      });
    } catch (error) {
      console.log("____Cannot get order cart by customer id");
      throw error;
    }
  },

  async store(req, res) {
    /* 
        #swagger.tags = ['Order/Cart']
         #swagger.description = "Create new Order/Cart"
        */
    try {
      const idcustomer = req.body.idcustomer;
      const idagency = req.body.idagency;
      let data = await OrderService.createOrder(idcustomer, idagency);
      console.log("____Create Order Successful");

      return res.status(200).json({
        status: 200,
        message: "Create Order Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Create Order Failed");
      throw err;
    }
  },

  async updateStatus(req, res) {
    /* 
        #swagger.tags = ['Order/Cart']
         #swagger.description = "Update a cart -> Order by idorder"
        */
    try {
      const idorder = req.params["idorder"];

      let data = await OrderService.updateOrderStatus(idorder);
      console.log("____Update Order status Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Order status  Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update status Failed");
      throw err;
    }
  },

  async updateTotal(req, res) {
    /* 
        #swagger.tags = ['Order/Cart']
         #swagger.description = "Update total money in cart"
        */
    try {
      const idorder = req.params["idorder"];

      let data = await OrderService.updateCartTotal(idorder);
      console.log("____Update cart total Successful");

      return res.status(200).json({
        status: 200,
        message: "Update cart total Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update cart total Failed");
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
