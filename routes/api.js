const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/town/:id', apiController.getTowns)
router.get('/email/:email', apiController.checkEmail)

module.exports=router;