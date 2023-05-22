const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');



router.use('/:id/update', productController.update);
router.use('/:id/delete', productController.delete);
router.use('/create', productController.create);
router.use('/:id?', productController.showbyid);
router.use('/', productController.product);

module.exports=router;