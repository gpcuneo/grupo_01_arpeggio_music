const express = require('express');
const router = express.Router();
const editproductController = require('../controllers/editproductController');

router.use('/', editproductController.index)

module.exports=router;