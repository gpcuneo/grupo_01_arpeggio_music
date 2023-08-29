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
router.post('/',upload.any('image'), validateCreate,productController.postProduct);
router.get('/search',isAdmin ,productController.search);

//GET /products/create
router.get('/create', isAdmin ,productController.create);

//GET /products/:id/detail
router.get('/:id', productController.showbyid);


//PUT /products/:id/update
router.put('/:id/update',upload.any('image'),validateCreate,productController.update);

//GET /products/:id/update
router.get('/:id/update',isAdmin ,productController.getUpDate);

//DELETE /products/:id/delete 
router.delete('/:id/delete', isAdmin,productController.delete);

module.exports=router;