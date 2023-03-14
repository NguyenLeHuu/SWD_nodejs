const CreatorService = require("../services/CreatorService");
const Firebase = require("../services/Firebase");

module.exports = {
  async getAll(req, res) {
    /* 
        #swagger.tags = ['Creator']
         #swagger.description = "Get all creator of agency"
        */
    try {
      const idagency = req.query.idagency;
      let data = await CreatorService.getAll(idagency);

      return res.status(200).json({
        status: 200,
        message: "Get creator successful!",
        data: data,
      });
    } catch (error) {
      console.log("____Khong lay duoc CreatorList");
      return res.status(400).json({
        status: 400,
        message: "Get creators fail!",
      });
    }
  },

  // async searchByName(req, res) {
  //   /* 
  //       #swagger.tags = ['TEST']
  //        #swagger.description = "test redis"
  //       */
  //   try {
  //     const name = req.body.name;
  //     // console.log(name);
      

  //     const value =await redis.clientGet("name")
  //     if(value){
  //       console.log("____________co trong redis" + value);
  //       return res.status(200).json({value: value});
  //     }else{
  //       console.log("____________khong co trong redis");
  //       let data = await CreatorService.searchByName(name);
  //       if(data){
  //         return res.status(203).json(data);
  //       }else{
  //         console.log("_____khong tim thay trong db");
  //         return res.status(400).json("______can not found");
  //       }
  //     }
  //   } catch (error) {
  //     console.log("____Khong lay duoc Agency");
  //     return res.status(400).json(error);
  //   }
  // },


  // async delete(req, res) {
  //   try {
  //     return res.status(200).json({
  //       status: 200,
  //       message: "Message",
  //       data: "data",
  //     });
  //   } catch (err) {
  //     return res.status(400).json({
  //       status: 400,
  //       message: err,
  //     });
  //   }
  // },

  // async update(req, res) {
  //   try {
  //     return res.status(200).json({
  //       status: 200,
  //       message: "Message",
  //       data: "data",
  //     });
  //   } catch (err) {
  //     return res.status(400).json({
  //       status: 400,
  //       message: err,
  //     });
  //   }
  // },
};
