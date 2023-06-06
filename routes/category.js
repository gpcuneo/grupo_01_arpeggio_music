const express = require('express');
const router = express.Router();
const category = require('../controllers/categoryController');
const categoryControllers = require('../controllers/categoryController');

//GET /category
router.get('/', categoryControllers.getCategory)
//POST /category
router.post('/', categoryControllers.postCategory)
//GET /category/create
router.get('/create', categoryControllers.getCategoryCreate)
//GET /category/:id
router.get('/:id', categoryControllers.getCategoryId)
//POST /category/:id
router.post('/:id', categoryControllers.postCategoryId)
//GET /category/:id/update
router.get('/:id', categoryControllers.getCategoryUpdate)
//POST /category/:id/delete
router.post('/:id', categoryControllers.postCategoryId)

module.exports = router

