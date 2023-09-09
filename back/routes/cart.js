const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const middlewares = require('../middlewares/index');
const loged = middlewares.authenticationMiddleware.apiAuth;

router.get('/', loged, cartController.cart);
router.get('/order', loged, cartController.order)
module.exports=router; 