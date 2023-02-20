const express = require('express');

let router = express();

const agencyRoute = require('./AgencyRoute');
const loginRoute = require('./LoginRoute');

router.use('/agency',agencyRoute);
router.use('/login',loginRoute);



module.exports=router