const authJwt = require("../middleware");
const express = require('express')
var router = express.Router();

/** Router */
router.use('/healthcheck', (req, res) => {  res.status(200).send("ok") });

const menu = require('./menu.router');
router.use('/menu', authJwt, menu);

const auth = require('./auth.router');
router.use('/auth', auth);

const register = require('./register.router');
router.use('/register', register);

const product = require('./product.router');
router.use('/product', authJwt, product);

const member_user = require('./member-user.router');
router.use('/member-user', authJwt, member_user);

const count_products = require('./count-product.router');
router.use('/count-product', authJwt, count_products);

module.exports = router