const express = require('express');

let router = express();

const agencyRoute = require('./AgencyRoute');
const loginRoute = require('./LoginRoute');
const imageRoute = require('./ImageRoute');
const signupRoute = require('./SignUpRoute');

router.use('/signup',signupRoute);
router.use('/login',loginRoute);
router.use('/agency',agencyRoute);
router.use('/image',imageRoute);



module.exports=router