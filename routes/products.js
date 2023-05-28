const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');



router.use('/:id/update', productController.update);
router.use('/:id/delete', productController.delete);
router.use('/create', productController.create);
router.get('/:id', productController.showbyid);
router.get('/', productController.product);

module.exports=router;