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
      const picture = data.picture;
      const name = data.name || null;
      const phone = data.phone || null;

    //   {
    //     "role":"creator",
    //     "idagency":"1",
    //     "address":"any",
    //     "data":{
    //        "name":"Chí Cường",
    //        "uid":"heida",
    //        "email":"chicuong@gmail.com",
    //        "phone":"03288168",
    //        "picture":"https://haycafe.vn/wp-content/uploads/2021/12/Hinh-nen-Full-HD-1080-cho-may-tinh-dep.jpg"
    //     }
    //  }

      //tao account
      switch(role) {
        case "agency":
            await AgencyService.createAgency(uid,name, email)
            break
        case "creator":
            await CreatorService.createCreator(uid,name, email,idagency,picture)
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
