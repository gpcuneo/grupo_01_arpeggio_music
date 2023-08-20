const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/town/:id', apiController.getTowns)
router.get('/email/:email', apiController.checkEmail)
router.get('/users/', apiController.userList)
router.get('/users/:userName', apiController.userDetail)

module.exports=router;