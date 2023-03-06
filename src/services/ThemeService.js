const db = require("../models/index");
const crypto = require('crypto');

let getAll = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Theme.findAll();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Theme.findByPk(id);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createTheme = (name, idcreator) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = crypto.randomBytes(15).toString('hex');
      let data = await db.Theme.create({
        idtheme:id,
        name: name,
        idcreator: idcreator,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateTheme = (id, name,status) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Theme.update(
        {
          name: name,
          status: status,
        },
        {
          where: {
            idtheme: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteTheme = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Theme.update(
        {
          status: 0,
        },
        {
        where: {
          idtheme: id,
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
  getOne: getOne,
  createTheme: createTheme,
  updateTheme: updateTheme,
  deleteTheme: deleteTheme,
};
