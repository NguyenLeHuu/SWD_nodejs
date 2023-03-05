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
const orderRoute = require('./OrderRoute');
const orderDetailRoute = require('./OrderDetailRoute');

router.use('/signup',signupRoute);
router.use('/login',loginRoute);
router.use('/agency',agencyRoute);
router.use('/theme',themeRoute);
router.use('/collection',collectionRoute);
router.use('/category',categoryRoute);
router.use('/product',productRoute);
router.use('/image',imageRoute);
router.use('/order', orderRoute);
router.use('/orderdetail',orderDetailRoute);

module.exports=router