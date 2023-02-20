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

        const tokenDevice = "cpXJrSNS66qYBZ2Kc2svrc:APA91bFjXfGYnjQ0XG8DM9a7hfd5neOrcSr5zKtU-Kos8jQh8gzoRgFAAzcnN_iDzhRIy1QSKOtqMu98vGeWYvwFHv7-Yc3pyUaEMs0eVOH91EUqbBO1ss_ftExPDFoDRV3wmNVfzvvF"
        // console.log(req.headers["tokenNotification"]);
        fcm.setMsg(tokenDevice,"Bảo mật tài khoản cảu bạn khỏi các quảng cáo")
        fcm.sendNoti();

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
