const express = require('express');
const router = express.Router();
//controllers
const productController = require('../controllers/productController');

//Middlewares
const middlewares = require('../middlewares/index');
const storageFile = require('../utils/storageTools');
const upload = storageFile.upload('productos');
const validateCreate = middlewares.validations.productFields;
const isAdmin = middlewares.authorizationMiddleware.isAdmin;

//GET /products  
router.get('/',isAdmin ,productController.product);

//POST /products 
router.post('/',upload.any('img'), validateCreate,productController.postProduct);

//GET /products/:id/detail
router.get('/:id/detail', productController.showbyid);

//GET /products/create
router.get('/create', isAdmin ,productController.create);

//PUT /products/:id/update
router.put('/:id/update', isAdmin,productController.update);

//GET /products/:id/update
router.get('/:id/update',isAdmin ,productController.getUpDate);

//DELETE /products/:id/delete 
router.delete('/:id/delete', isAdmin,productController.delete);

module.exports=router;