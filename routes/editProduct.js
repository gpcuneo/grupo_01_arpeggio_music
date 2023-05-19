const express = require('express');
const router = express.Router();
const editproductController = require('../controllers/editProduct');

router.use('/', editproductController.index)

module.exports=router;