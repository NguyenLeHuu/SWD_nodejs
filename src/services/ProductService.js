const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        data.name = " ";
      }
      if (!data.category) {
        data.category = "%";
      }
      if (!data.limit) {
        data.limit = 10;
      }
      if (!data.status) {
        data.status = "%";
      }
      if (!data.min) {
        data.min = 0;
      }
      if (!data.max) {
        data.max = 10000; //gia cao nhat
      }

      let products = await db.Product.findAll({
        // include:[
        //   {
        //     model: db.Category,
        //     attributes: [],
        //   }
        // ],
        // raw:true,
        // nest:true,
        where: {
          [Op.and]: [
            {
              idcollection: {
                [Op.eq]: `${data.idcollection.trim()}`,
              },
            },
            {
              name: {
                [Op.like]: `%${data.name.trim()}%`,
              },
            },
            {
              status: {
                [Op.like]: `%${data.status.trim()}%`,
              },
            },
            {
              idproductcategory: {
                [Op.like]: `${data.category}`,
              },
            },
            {
              price: {
                [Op.between]: [`${data.min}`, `${data.max}`],
              },
            },
          ],
        },
        offset: (data.page - 1) * data.limit || 0,
        limit: Number(data.limit),
      });
      resolve(products);
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

let createProduct = (data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = crypto.randomBytes(15).toString("hex");
      let result = await db.Product.create({
        idproduct: id,
        name: data.name,
        quantity: data.quantity,
        price: data.price,
        idproductcategory: data.idproductcategory,
        idcollection: data.idcollection,
        image: image,
      });
      resolve(result);
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
