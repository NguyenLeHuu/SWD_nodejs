const express = require('express');

let router = express();

const agencyRoute = require('./AgencyRoute');
const loginRoute = require('./LoginRoute');
const imageRoute = require('./ImageRoute');
const productRoute = require('./ProductRoute');
const categoryRoute = require('./CategoryRoute');
const signupRoute = require('./SignUpRoute');
const themeRoute = require('./ThemeRoute');
const collectionRoute = require('./CollectionRoute');

router.use('/signup',signupRoute);
router.use('/login',loginRoute);
router.use('/agency',agencyRoute);
router.use('/theme',themeRoute);
router.use('/collection',collectionRoute);
router.use('/category',categoryRoute);
router.use('/product',productRoute);
router.use('/image',imageRoute);

module.exports=router