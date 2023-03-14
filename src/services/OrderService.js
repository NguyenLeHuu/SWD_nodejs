const db = require("../models/index");
const crypto = require("crypto");
const Utils = require("./Utils");

let sequelize = db.sequelize;

let getByAgency = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.OrderCart.findAll({
        where: {
          idagency: id,
        },
      });
      Utils.setStatus(data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getByCustomer = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.OrderCart.findAll({
        include: [
          {
            model: db.OrderCartDetail,
            attributes: [
              "idorderdetail",
              "idproduct",
              "quantity",
              "totalprice",
            ],
          },
        ],
        raw: false,
        nest: true,
        where: {
          idcustomer: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getByCreator = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.sequelize.query(
        "SELECT O.idorder, O.datetime , totalmoney, tracking, O.status, C.idcreator, C.name AS creatorname " +
          "FROM products P, collections CL, themes T, creators C, ordercarts O, ordercartdetails OD " +
          "WHERE P.idcollection = CL.idcollection " +
          "AND CL.idtheme = T.idtheme " +
          "AND T.idcreator = C.idcreator " +
          "AND P.idproduct = OD.idproduct " +
          "AND OD.idorder = O.idorder " +
          "AND C.idcreator = " +
          ` :id`,
        { replacements: { id: id }, type: sequelize.QueryTypes.SELECT }
      );
      Utils.setStatus(data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createOrder = (idcustomer, idagency) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = crypto.randomBytes(15).toString("hex");
      let data = await db.OrderCart.create({
        idorder: id,
        idcustomer: idcustomer,
        idagency: idagency,
        datetime: new Date(),
        totalmoney: 0,
        status: true,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateOrderStatus = (idorder) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.OrderCart.update(
        {
          status: false,
          datetime: new Date(),
          tracking: "Pending",
        },
        {
          where: {
            idorder: idorder,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateOrderTracking = (idorder, tracking) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.OrderCart.update(
        {
          datetime: new Date(),
          tracking: tracking,
        },
        {
          where: {
            idorder: idorder,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateCartTotal = (idorder) => {
  return new Promise(async (resolve, reject) => {
    try {
      let total = await db.OrderCartDetail.sum("totalprice", {
        where: {
          idorder: idorder,
        },
      });
      let data = await db.OrderCart.update(
        {
          totalmoney: total,
        },
        {
          where: {
            idorder: idorder,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getByAgency: getByAgency,
  getByCustomer: getByCustomer,
  getByCreator: getByCreator,
  createOrder: createOrder,
  updateOrderStatus: updateOrderStatus,
  updateCartTotal: updateCartTotal,
  updateOrderTracking: updateOrderTracking,
};
