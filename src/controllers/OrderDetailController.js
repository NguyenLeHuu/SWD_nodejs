const { RedshiftData } = require("aws-sdk");
const OrderDetailService = require("../services/OrderDetailService");
const fcm = require("../services/fcm");
const redis = require("../services/redis");

module.exports = {
  async index(req, res) {
    /* 
        #swagger.tags = ['OrderDetail']
         #swagger.description = "Get order details by order id"
        */
    try {
      const id = req.params["id"];
      let data = await OrderDetailService.getAll(id);

      return res.status(200).json({
        status: 200,
        message: "Get detail by order id successful!",
        data: data,
      });
    } catch (error) {
      console.log("____Cannot get detail by order id");
      throw error;
    }
  },

  async store(req, res) {
    /* 
        #swagger.tags = ['OrderDetail']
         #swagger.description = "Create new OrderDetail"
        */
    try {
      const idproduct = req.body.idproduct;
      const idorder = req.body.idorder;
      const quantity = req.body.quantity;
      let data = await OrderDetailService.addOrderDetail(idorder, idproduct, quantity);
      console.log("____Add OrderDetail Successful");


      return res.status(200).json({
        status: 200,
        message: "Add OrderDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Add OrderDetail Failed");
      throw err;
    }
  },

  async delete(req, res) {
    /* 
        #swagger.tags = ['OrderDetail']
         #swagger.description = "Delete OrderDetail by idorderdetail"
        */
    try {
      const id = req.params["id"];

      let data = await OrderDetailService.deleteOrderDetail(id);
      console.log("____Delete OrderDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Delete OrderDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Delete OrderDetail Failed");
      throw err;
    }
  },

  async update(req, res) {
    /* 
        #swagger.tags = ['OrderDetail']
         #swagger.description = "Update a OrderDetail"
        */
    try {
      const quantity = req.body.quantity;
      const idorderdetail = req.body.idorderdetail;

      let data = await OrderDetailService.updateOrderDetail(idorderdetail, quantity);
      console.log("____Update OrderDetail Successful");

      return res.status(200).json({
        status: 200,
        message: "Update OrderDetail Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update OrderDetail Failed");
      throw err;
    }
  },
};
