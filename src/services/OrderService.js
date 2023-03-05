const db = require("../models/index");
const crypto = require("crypto");

let getAll = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.OrderCart.findAll({
        where : {
          idcustomer : id,
        }
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
      let id = crypto.randomBytes(15).toString('hex');
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
      let total = await db.OrderCartDetail.sum('totalprice', {
        where: {
          idorder: idorder,
        }
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
  getAll: getAll,
  createOrder: createOrder,
  updateOrderStatus: updateOrderStatus,
  updateCartTotal: updateCartTotal,
};
