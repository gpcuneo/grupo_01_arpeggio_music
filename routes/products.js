const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');



router.get('/', productController.product);
router.post('/', productController.postProduct);
router.get('/:id/detail', productController.showbyid);
router.get('/create', productController.create);
router.put('/:id/update', productController.update);
router.get('/:id/update', productController.getUpDate);
router.delete('/:id/delete', productController.delete);

module.exports=router;