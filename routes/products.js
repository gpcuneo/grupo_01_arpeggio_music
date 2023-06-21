const express = require('express');
const router = express.Router();
//controllers
const productController = require('../controllers/productController');

//Middlewares
const storageFile = require('../utils/storageTools');
const upload = storageFile.upload('productos');
const validateCreateMiddleware = require('../middlewares/index');


//GET /products  
router.get('/', productController.product);

//POST /products 
router.post('/', upload.any('img'), validateCreateMiddleware.validations ,productController.postProduct);

//GET /products/:id/detail
router.get('/:id/detail', productController.showbyid);

//GET /products/create
router.get('/create', productController.create);

//PUT /products/:id/update
router.put('/:id/update', productController.update);

//GET /products/:id/update
router.get('/:id/update', productController.getUpDate);

//DELETE /products/:id/delete 
router.delete('/:id/delete', productController.delete);

module.exports=router;