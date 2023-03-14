const express = require('express');

let router = express();

const agencyRoute = require('./AgencyRoute');
const creatorRoute = require('./CreatorRoute');
const loginRoute = require('./LoginRoute');
const imageRoute = require('./ImageRoute');
const productRoute = require('./ProductRoute');
const categoryRoute = require('./CategoryRoute');
const signupRoute = require('./SignUpRoute');
const themeRoute = require('./ThemeRoute');
const collectionRoute = require('./CollectionRoute');
const orderRoute = require('./OrderRoute');
const orderDetailRoute = require('./OrderDetailRoute');
const createPayRoute = require('./CreatePayRoute');
const createPaySuccessRoute = require('./PaySuccessRoute');
const createPayCancelRoute = require('./PayCancelRoute');
const checkoutRoute = require('./CheckoutRoute');

router.use('/signup',signupRoute);
router.use('/login',loginRoute);
router.use('/agency',agencyRoute);
router.use('/creator',creatorRoute);
router.use('/theme',themeRoute);
router.use('/collection',collectionRoute);
router.use('/category',categoryRoute);
router.use('/product',productRoute);
router.use('/image',imageRoute);
router.use('/order', orderRoute);
router.use('/orderdetail',orderDetailRoute);
router.use('/pay',createPayRoute);
router.use('/success',createPaySuccessRoute);
router.use('/cancel',createPayCancelRoute);
router.use('/checkout',checkoutRoute);

module.exports=router