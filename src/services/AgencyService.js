const db = require("../models/index");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Agency.findAll();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let searchByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Agency.findOne({ where: { name: name } });
      resolve(data);
      if(data=== null){
        console.log('________(searchAgency)Not found!');
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createAgency = (name, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Agency.create({
        name: name,
        email: email,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAll: getAll,
  createAgency: createAgency,
  searchByName: searchByName,
};
