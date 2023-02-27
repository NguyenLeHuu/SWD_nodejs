const express = require('express');

let router = express();

const agencyRoute = require('./AgencyRoute');
const loginRoute = require('./LoginRoute');
const imageRoute = require('./ImageRoute');
const productRoute = require('./ProductRoute');
const categoryRoute = require('./CategoryRoute');

router.use('/login',loginRoute);
router.use('/agency',agencyRoute);
router.use('/category',categoryRoute);
router.use('/product',productRoute);
router.use('/image',imageRoute);

module.exports=router