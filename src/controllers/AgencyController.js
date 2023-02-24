const AgencyService = require("../services/AgencyService");
const fcm = require("../services/fcm");
const redis = require("../services/redis");
module.exports = {
  async index(req, res) {
    /* 
        #swagger.tags = ['Agency']
         #swagger.description = "Get all agency"
        */
    try {
      let data = await AgencyService.getAll();

      const tokenDevice =
        "eowymDzjzrDw-YfpzdJgJs:APA91bFpIgAosp6Z3SgHZr59sr2Juo9uJanEE7WtSw7Chp-bgNFcGyefVETfYJ1fuKhTDcmDmdtYd8TuyeALS_MkfIIyC-FU4q5gRfZCF6YHWkdfASqiE1Oul1NsS5GSFh8-hu0n545G";
      // console.log(req.headers["tokenNotification"]);
      // fcm.setMsg(tokenDevice, "Bảo mật tài khoản cảu bạn khỏi các quảng cáo");
      // fcm.sendNoti();
      // fcm.sendNotiToToPic();

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

  async searchByName(req, res) {//hàm test redis,thầy đừng bắt bẻ nha thầy :((
    /* 
        #swagger.tags = ['Agency']
         #swagger.description = "Get agency by name"
        */
    try {
      const name = req.body.name;
      // console.log(name);
      

      const value =await redis.clientGet("name")
      if(value){
        console.log("____________co trong redis" + value);
        return res.status(200).json({value: value});
      }else{
        console.log("____________khong co trong redis");
        let data = await AgencyService.searchByName(name);
        if(data){
          return res.status(203).json(data);
        }else{
          console.log("_____khong tim thay trong db");
          return res.status(400).json("______can not found");
        }
      }
    } catch (error) {
      console.log("____Khong lay duoc Agency");
      return res.status(400).json(error);
    }
  },

  async store(req, res) {
    /* 
        #swagger.tags = ['Agency']
         #swagger.description = "Create new Agency"
        */
    try {
      const name = req.body.name;
      const email = req.body.email;
      let data = await AgencyService.createAgency(name, email);
      console.log("____Tao moi agency thanh cong");

      // const {key,value} = req.body;
      await redis.clientSet("name", name);

      return res.status(200).json({
        status: 200,
        message: "Tao moi agency thanh cong!",
        data: data,
      });
    } catch (err) {
      console.log("____Tao moi agency that bai");
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
