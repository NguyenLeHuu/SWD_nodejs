const db = require("../models/index");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Creator.findAll();
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

let createCreator = (uid,name, email,idagency) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Creator.create({
        idcreator: uid,
        name: name,
        email: email,
        idagency: idagency,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAll: getAll,
  createCreator: createCreator,
  searchByName: searchByName,
};
