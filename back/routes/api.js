const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const apiCart = require('../controllers/apiCart');
const mp = require('../controllers/mercadoPagoController');
const middlewares = require('../middlewares/index');
const loged = middlewares.authenticationMiddleware.apiAuth;

router.get('/town/:id', apiController.getTowns)
router.get('/email/:email', apiController.checkEmail)
router.get('/users/', apiController.userList)
router.get('/users/:userName', apiController.userDetail)
router.get('/products', apiController.productList)
router.get('/products/:id',apiController.productDetail)
router.post('/searchProduct', apiController.searchProducts)
router.get('/category', apiController.categoryList)
router.get('/category/products/',apiController.categoryProducts)
router.get('/category/:id',apiController.categoryDetail)
router.get('/cart', loged, apiCart.getCart)
router.post('/cart', loged, apiCart.addItem)
router.put('/cart', loged, apiCart.updateItemQuantity)
router.delete('/cart', loged, apiCart.deleteItem)
router.post('/mp/createPreference', loged, mp.createPreference)
router.post('/mp/payByCard', loged, mp.payByCard)
router.get('/sales', apiController.getSalesDetails)

module.exports=router;