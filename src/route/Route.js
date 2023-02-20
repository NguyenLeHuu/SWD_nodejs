const express = require('express');

let router = express();

const agencyRoute = require('./AgencyRoute');
const loginRoute = require('./LoginRoute');
const imageRoute = require('./ImageRoute');

router.use('/agency',agencyRoute);
router.use('/login',loginRoute);
router.use('/image',imageRoute);



module.exports=router