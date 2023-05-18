const express = require('express');
const router = express.Router();
const aboutControllers = require('../controllers/aboutController');

router.use('/', aboutControllers.index)

module.exports=router;