const db = require("../models/index");
const crypto = require("crypto");
const Utils = require("./Utils");

let sequelize = db.sequelize;

let getByAgency = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.OrderCart.findAll({
        include: [
          {
            model: db.Customer,
            attributes: ["idcustomer", "name", "email", "address"],
          },
        ],
        raw: false,
        nest: true,
        where: {
          idagency: id,
        },
      });
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
      let data = await db.OrderCart.findAll({
        attributes: [
          "idorder",
          "datetime",
          "status",
          "tracking",
          [
            db.sequelize.fn(
              "SUM",
              db.sequelize.col("OrderCartDetails.totalprice")
            ),
            "totalmoneyCreator",
          ],
        ],

        include: [
          {
            model: db.OrderCartDetail,
            attributes: [],
            include: [
              {
                model: db.Product,
                attributes: [],
                include: [
                  {
                    model: db.Collection,
                    attributes: [],
                    include: [
                      {
                        model: db.Theme,
                        attributes: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: db.Customer,
            attributes: ["idcustomer", "name", "email"],
          },
        ],
        where: { "$OrderCartDetails.Product.Collection.Theme.idcreator$": id },
        group: ["OrderCart.idorder", "OrderCart.status", "OrderCart.tracking"],
        raw: false,
        nest: true,
      });

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
