const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.findAll();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.findByPk(id);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createProduct = (
  name,
  quantity,
  price,
  idproductcategory,
  idcollection
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = crypto.randomBytes(15).toString("hex");
      let data = await db.Product.create({
        idproduct: id,
        name: name,
        quantity: quantity,
        price: price,
        idproductcategory: idproductcategory,
        idcollection: idcollection,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateProduct = (id, name, quantity, price) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.update(
        {
          name: name,
          quantity: quantity,
          price: price,
        },
        {
          where: {
            idproduct: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Product.update(
        {
          status: "Out of Stock",
        },
        {
          where: {
            idproduct: id,
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
  getOne: getOne,
  createProduct: createProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
