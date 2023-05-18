const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.use('/', cartController.cart);
module.exports=router;