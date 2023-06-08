const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categoryController');

//GET /category
router.get('/', categoryControllers.getCategory)
//POST /category
router.post('/', categoryControllers.postCategory)
//GET /category/create
router.get('/create', categoryControllers.getCategoryCreate)
//GET /category/:id
router.get('/:id', categoryControllers.getCategoryId)
//GET /category/:id/update
router.get('/:id/update', categoryControllers.getCategoryUpdate)
//POST /category/:id/delete
router.post('/:id', categoryControllers.getCategoryDelete)

module.exports = router

