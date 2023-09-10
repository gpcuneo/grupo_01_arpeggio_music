const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const middlewares = require('../middlewares/index');
const loged = middlewares.authenticationMiddleware.apiAuth;

router.get('/:id', loged, historyController.index)

module.exports=router;