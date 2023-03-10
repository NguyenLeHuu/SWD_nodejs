const db = require("../models/index");
const crypto = require("crypto");
const OrderService = require("./OrderService");

let getAll = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.OrderCartDetail.findAll({
        where: {
          idorder: id,
        },
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
  addOrderDetail: addOrderDetail,
  updateOrderDetail: updateOrderDetail,
  deleteOrderDetail: deleteOrderDetail,
  getOrderCartDetail,
};
