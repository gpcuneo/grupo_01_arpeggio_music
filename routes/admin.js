const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const middlewares = require('../middlewares/index');
const isAdmin = middlewares.authorizationMiddleware.isAdmin;

router.use('/', isAdmin, adminController.home);

module.exports=router;