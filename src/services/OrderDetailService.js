const db = require("../models/index");
const crypto = require("crypto");

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
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateOrderDetail = (idorderdetail, quantity) => {
  if (quantity === 0) {
    return new Promise(async (resolve, reject) => {
      try {
        let searchProduct = await db.OrderCartDetail.findOne({
          attributes: ["idproduct"],
          where: {
            idorderdetail: idorderdetail,
          },
        });
        let Product = await db.Product.findOne({
          attributes: ["price"],
          where: {
            idproduct: searchProduct.idproduct,
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
      let data = await db.OrderCartDetail.destroy({
        where: {
          idorderdetail: id,
        },
      });
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
};
