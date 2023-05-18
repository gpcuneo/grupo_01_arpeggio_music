const express = require('express');
const router = express.Router();
const compraController = require('../controllers/productCatC')

router.use('/', compraController.Index)

module.exports = router
