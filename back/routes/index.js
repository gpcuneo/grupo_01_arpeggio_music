const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')

router.use('/', indexController.Index)

module.exports = router

