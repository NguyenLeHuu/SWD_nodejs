const { Op } = require("sequelize");
const db = require("../models/index");
const crypto = require("crypto");

let getAll = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        data.name = "";
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
        data.max = 10000000; //gia cao nhat
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
      // let data = await db.Product.findByPk(id);
      let data = await db.Product.findOne({
        where: {
          idproduct: id,
        },
        include: {
          model: db.Image,
          // attributes: [
          //   "urlImage",
          // ],
          group: "idproduct",
        },
        raw: false,
        // nest: true,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createProduct = (data, listImage) => {
  // let createProduct = (data, image) => {

  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.Product.create({
        idproduct: id,
        name: data.name,
        quantity: data.quantity,
        price: data.price,
        idproductcategory: data.idproductcategory,
        idcollection: data.idcollection,
        image:
          "https://cdn.shopify.com/s/files/1/0034/8759/6579/files/Black_large_logo.png?height=628&pad_color=fff&v=1614328540&width=1200&fbclid=IwAR2mUhBNanKugkGMIUThYS_9gCYlHaSyayw8Mc6KKKBQKox_CbOQlaoX7BM ",
      });

      await db.Product.update(
        {
          image: listImage[0]
        },
        {
          where: {
            idproduct: id,
          },
        }
      );

      listImage.shift();

      listImage.forEach(async (element) => {
        const idimage = crypto.randomBytes(15).toString("hex");
        await db.Image.create({
          idimage: idimage,
          urlImage: element,
          idproduct: id,
        });
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
