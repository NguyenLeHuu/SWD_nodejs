const db = require("../models/index");

let getAll = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Category.findAll();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createCategory = (name, idagency) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Category.create({
        name: name,
        idagency: idagency,
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
      let data = await db.Category.destroy({
        where: {
          idproductcategory: id,
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
  createCategory: createCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
};
