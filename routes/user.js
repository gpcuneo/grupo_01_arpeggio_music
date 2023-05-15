const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')



router.use('/:id?', userController.index)




module.exports = router;