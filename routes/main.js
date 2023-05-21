const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.use('/about', mainController.about);
router.use('/shipping', mainController.shipping);
router.use('/store', mainController.store);
router.use('/', mainController.home);
router.use('/*', mainController.error);

module.exports=router;