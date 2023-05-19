const express = require ('express');
const router = express.Router();
const newproductController = require ('../controllers/newProduct')

router.use ('/',newproductController.Index)

module.exports=router