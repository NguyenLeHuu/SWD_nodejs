const db = require("../models/index");
const crypto = require("crypto");
const Utils = require("./Utils");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Category.findAll({});
      Utils.setStatus(data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createCategory = (name, idagency) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = crypto.randomBytes(15).toString("hex");
      let data = await db.Category.create({
        idproductcategory: id,
        name: name,
        idagency: idagency,
        status: true,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateCategory = (id, name, idagency) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Category.update(
        {
          name: name,
          idagency: idagency,
        },
        {
          where: {
            idproductcategory: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Category.update(
        {
          status: false,
        },
        {
          where: {
            idproductcategory: id,
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
  createCategory: createCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
};
