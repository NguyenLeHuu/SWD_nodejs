const db = require("../models/index");
const crypto = require("crypto");
const OrderService = require("./OrderService");

let sequelize = db.sequelize;

let getAll = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await sequelize.query(
        "SELECT O.idorder, OD.idorderdetail, P.name AS productname, P.image, OD.quantity, totalprice, " +
          "C.name AS creatorName, CT.name AS customername, A.name AS agencyname " +
          "FROM products P " +
          "JOIN collections CL ON P.idcollection = CL.idcollection " +
          "JOIN themes T ON CL.idtheme = T.idtheme " +
          "JOIN creators C ON T.idcreator = C.idcreator " +
          "JOIN agencies A ON C.idagency = A.idagency " +
          "JOIN ordercartdetails OD ON P.idproduct = OD.idproduct " +
          "JOIN ordercarts O ON OD.idorder = O.idorder " +
          "JOIN customers CT ON O.idcustomer = CT.idcustomer " +
          "WHERE OD.idorder = " +
          ` :id`,
        {
          model: [
            db.Product,
            db.Collection,
            db.Theme,
            db.Creator,
            db.OrderCart,
            db.OrderCartDetail,
            db.Agency,
            db.Customer,
          ],
          mapToModel: true,
          replacements: { id: id },
          type: sequelize.QueryTypes.SELECT,
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getByCreator = (idorder, idcreator) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await sequelize.query(
        "SELECT O.idorder, OD.idorderdetail, P.idproduct, P.name AS productname, P.image, OD.quantity, totalprice, " +
          "C.idcreator, C.name AS creatorname, CT.name AS customername, A.name AS agencyname " +
          "FROM products P " +
          "JOIN collections CL ON P.idcollection = CL.idcollection " +
          "JOIN themes T ON CL.idtheme = T.idtheme " +
          "JOIN creators C ON T.idcreator = C.idcreator " +
          "JOIN agencies A ON C.idagency = A.idagency " +
          "JOIN ordercartdetails OD ON P.idproduct = OD.idproduct " +
          "JOIN ordercarts O ON OD.idorder = O.idorder " +
          "JOIN customers CT ON O.idcustomer = CT.idcustomer " +
          `WHERE OD.idorder = :id ` +
          `AND C.idcreator = :idcreator `,
        {
          model: [
            db.Product,
            db.Collection,
            db.Theme,
            db.Creator,
            db.OrderCart,
            db.OrderCartDetail,
            db.Agency,
            db.Customer,
          ],
          replacements: { id: idorder, idcreator: idcreator },
          type: sequelize.QueryTypes.SELECT,
        }
      );
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
