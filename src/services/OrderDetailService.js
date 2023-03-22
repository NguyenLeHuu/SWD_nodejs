const db = require("../models/index");
const crypto = require("crypto");
const OrderService = require("./OrderService");

let sequelize = db.sequelize;

let getAll = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.OrderCart.findOne({
        attributes: ["idorder", "datetime", "totalmoney", "status", "tracking"],

        include: [
          {
            model: db.Customer,
            attributes: ["idcustomer", "name", "email"],
          },
          {
            model: db.OrderCartDetail,
            attributes: ["idorderdetail", "quantity", "totalprice"],
            include: [
              {
                model: db.Product,
                attributes: ["idproduct", "name", "image"],
                include: [
                  {
                    model: db.Collection,
                    attributes: ["idcollection", "name"],
                    include: [
                      {
                        model: db.Theme,
                        attributes: ["idtheme", "name"],
                        include: [
                          {
                            model: db.Creator,
                            attributes: ["idcreator", "name"],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        where: {
          idorder: id,
        },
        raw: false,
        nest: true,
      });

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getByCreator = (idorder, idcreator) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.OrderCart.findOne({
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
            model: db.Customer,
            attributes: ["idcustomer", "name", "email"],
          },
          {
            model: db.OrderCartDetail,
            attributes: ["idorderdetail", "quantity", "totalprice"],
            include: [
              {
                model: db.Product,
                attributes: ["idproduct", "name", "image"],
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
        ],
        where: {
          "$OrderCartDetails.Product.Collection.Theme.idcreator$": idcreator,
          idorder: idorder,
        },
        group: [
          "OrderCart.idorder",
          "OrderCart.status",
          "OrderCart.tracking",
          "OrderCartDetails.idorderdetail",
        ],
        raw: false,
        nest: true,
      });

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let addOrderDetail = (idorder, idproduct, quantity) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Product = await db.Product.findOne({
        attributes: ["price"],
        where: {
          idproduct: idproduct,
        },
      });
      let total = Product.price * quantity;
      let id = crypto.randomBytes(15).toString("hex");
      let data = await db.OrderCartDetail.create({
        idorderdetail: id,
        quantity: quantity,
        idproduct: idproduct,
        idorder: idorder,
        totalprice: total,
      });
      await OrderService.updateCartTotal(idorder);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateOrderDetail = (idorderdetail, quantity) => {
  if (quantity !== 0) {
    return new Promise(async (resolve, reject) => {
      try {
        let search = await db.OrderCartDetail.findOne({
          attributes: ["idproduct", "idorder"],
          where: {
            idorderdetail: idorderdetail,
          },
        });
        let Product = await db.Product.findOne({
          attributes: ["price"],
          where: {
            idproduct: search.idproduct,
          },
        });
        let total = Product.price * quantity;
        let data = await db.OrderCartDetail.update(
          {
            quantity: quantity,
            totalprice: total,
          },
          {
            where: {
              idorderdetail: idorderdetail,
            },
          }
        );
        await OrderService.updateCartTotal(search.idorder);
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  } else deleteOrderDetail(idorderdetail);
};

let deleteOrderDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.OrderCartDetail.findOne({
        attributes: ["idorder"],
        where: {
          idorderdetail: id,
        },
      });
      let orderStatus = await db.OrderCart.findOne({
        attributes: ["status"],
        where: {
          idorder: order.idorder,
        },
      });
      if (orderStatus.status.readInt8() !== 0) {
        let data = await db.OrderCartDetail.destroy({
          where: {
            idorderdetail: id,
          },
        });
        resolve(data);
      } else {
        reject({
          message: "The order is ordered - Cannot delete order detail",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getOrderCartDetail = (idorder) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.OrderCartDetail.findOne({
        where: {
          idorder: idorder,
        },
      });
      console.log("________");
      console.log(data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAll: getAll,
  getByCreator: getByCreator,
  addOrderDetail: addOrderDetail,
  updateOrderDetail: updateOrderDetail,
  deleteOrderDetail: deleteOrderDetail,
  getOrderCartDetail,
};
