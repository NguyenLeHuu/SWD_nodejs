const db = require("../models/index");
const crypto = require('crypto');
const Utils = require('./Utils');

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Collection.findAll();
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
      let data = await db.Collection.findByPk(id);
      data.status = data.status.readInt8();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createCollection = (name, idtheme) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = crypto.randomBytes(15).toString('hex');
      let data = await db.Collection.create({
        idcollection: id,
        name: name,
        idtheme: idtheme,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateCollection = (id, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Collection.update(
        {
          name: name,
        },
        {
          where: {
            idcollection: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCollection = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Collection.update(
        {
          status: 0,
        },
        {
        where: {
          idcollection: id,
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
  createCollection: createCollection,
  updateCollection: updateCollection,
  deleteCollection: deleteCollection,
};
