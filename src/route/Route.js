const express = require('express');

let router = express();

const agencyRoute = require('./AgencyRoute');
const loginRoute = require('./LoginRoute');
const imageRoute = require('./ImageRoute');
const productRoute = require('./ProductRoute');

router.use('/agency',agencyRoute);
router.use('/login',loginRoute);
router.use('/image',imageRoute);
router.use('/product',productRoute);



module.exports=router