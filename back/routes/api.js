const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/town/:id', apiController.getTowns)
router.get('/email/:email', apiController.checkEmail)
router.get('/users/', apiController.userList)
router.get('/users/:userName', apiController.userDetail)
router.get('/products', apiController.productList)
router.get('/products/:id',apiController.productDetail)
router.get('/category', apiController.categoryList)
router.get('/category/products/',apiController.categoryProducts)
router.get('/category/:id',apiController.categoryDetail)

module.exports=router;