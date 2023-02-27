const express = require('express');

let router = express();

const agencyRoute = require('./AgencyRoute');
const loginRoute = require('./LoginRoute');
const imageRoute = require('./ImageRoute');
const productRoute = require('./ProductRoute');
const categoryRoute = require('./CategoryRoute');

router.use('/agency',agencyRoute);
router.use('/login',loginRoute);
router.use('/image',imageRoute);
router.use('/product',productRoute);
router.use('/category',categoryRoute);

module.exports=router