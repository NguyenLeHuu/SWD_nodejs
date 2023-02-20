const AgencyService = require("../services/AgencyService");
const fcm = require("../services/fcm");
module.exports = {
  async index(req, res) {
    /* 
        #swagger.tags = ['Agency']
         #swagger.description = "Get all agency"
        */
       try {
        let data = await AgencyService.getAll();
        console.log("________tesst noti trước khi gửi");
        fcm.sendNoti;
        console.log("sau khi gui noti");
        return res.status(200).json({
          status: 200,
          message: "Get agency successful!",
          data: data,
        });
       } catch (error) {
        console.log("____Khong lay duoc AgencyList");
        throw error;
       }
  },

  async store(req, res) {
    try {
      return res.status(200).json({
        status: 200,
        message: "Message",
        data: "data",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async delete(req, res) {
    try {
      return res.status(200).json({
        status: 200,
        message: "Message",
        data: "data",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },

  async update(req, res) {
    try {
      return res.status(200).json({
        status: 200,
        message: "Message",
        data: "data",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
  },
};
