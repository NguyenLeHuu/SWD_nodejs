const AgencyService = require("../services/AgencyService");
const CreatorService = require("../services/CreatorService");
const CustomerService = require("../services/CustomerService");


module.exports = {
  async SignUp(req, res) {
    /* 
        #swagger.tags = ['Auth']
        */
    try {
      const role = req.body.role;
      const idagency = req.body.idagency || 1;
      const address = req.body.address || null;
      const data = req.body.data;

      const uid = data.uid;
      const email = data.email;
      const name = data.name || null;
      const phone = data.phone || null;

      //tao account
      switch(role) {
        case "agency":
            await AgencyService.createAgency(uid,name, email)
            break
        case "creator":
            await CreatorService.createCreator(uid,name, email,idagency)
            break
        case "customer":
            await CustomerService.createCustomer(uid,name,phone, email,address)
            break
        default:
            console.log("_____role sai");
            return res.status(400).json({
              status: 400,
              message: "________Tao moi tai khoan that bai!",
            });
      }
      console.log("______(signup) success!");
      return res.status(200).json({
        status: 200,
        message: "Tao moi tai khoan thanh cong!",
      });
    } catch (error) {
      console.log("________(signup) fail!");
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },
};
