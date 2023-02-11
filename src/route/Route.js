const express = require('express');

let router = express();
const jwt = require("jsonwebtoken");

const cartRoute = require('./CartRoute');
const categoryRoute = require('./CategoryRoute');
const favoriteRoute = require('./FavoriteRoute');
const imageRoute = require('./ImageRoute');
const invoiceProductRoute = require('./InvoiceProductRoute');
const invoiceRoute = require('./InvoiceRoute');
const productRoute = require('./ProductRoute');
const userRoute = require('./UserRoute');
const agencyRoute = require('./AgencyRoute');

router.use('/cart',cartRoute);
router.use('/category',categoryRoute);
router.use('/favorite',favoriteRoute);
router.use('/image',imageRoute);
router.use('/invoice-product',invoiceProductRoute);
router.use('/invoice',invoiceRoute);
router.use('/product',productRoute);
router.use('/user',userRoute);
router.use('/agency',authenToken,agencyRoute);

function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    // 'Beaer [token]'
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.sendStatus(401);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      console.log(err, data);
      if (err) res.sendStatus(403);
      next();
    });
  }


module.exports=router