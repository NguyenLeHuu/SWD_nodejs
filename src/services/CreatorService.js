const db = require("../models/index");
const Utils = require('./Utils');

let getAll = (idagency) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Creator.findAll(
        {
          where: {
            idagency: idagency
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

let getOne = (idcreator) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Creator.findByPk(idcreator)     
      Utils.setStatus(data);
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let searchByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Creator.findOne({ where: { name: name } });
      resolve(data);
      if(data=== null){
        console.log('________(searchCreator)Not found!');
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createCreator = (uid,name, email,idagency,picture) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Creator.create({
        idcreator: uid,
        name: name,
        email: email,
        idagency: idagency,
        picture: picture,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateStatus = (id,status) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Creator.update(
        {
          status: status,
        },
        {
          where: {
            idcreator: id,
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
  getOne,
  updateStatus,
  createCreator: createCreator,
  searchByName: searchByName,
};
