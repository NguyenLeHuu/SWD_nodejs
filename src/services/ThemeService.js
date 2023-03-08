const db = require("../models/index");
const crypto = require('crypto');
const Utils = require('./Utils');

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Theme.findAll();
      Utils.setStatus(data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};
let getThemeOfCreator = (idcreator) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Theme.findAll(
        {
          where: {
            idcreator: idcreator
          }
        }
      );
      Utils.setStatus(data);
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
      data.status = data.status.readInt8();
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

let updateTheme = (id, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Theme.update(
        {
          name: name,
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
  getThemeOfCreator: getThemeOfCreator,
};
