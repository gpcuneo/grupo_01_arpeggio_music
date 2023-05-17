const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.use('/:id?', productController.Index);

module.exports=router;