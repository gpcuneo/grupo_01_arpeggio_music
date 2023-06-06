const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categoryController');

//GET /category
router.get('/', categoryControllers.getCategory)
//POST /category
router.post('/', categoryControllers.postCategory)
//GET /category/create
router.get('/create', categoryControllers.getCategoryCreate)
//¿¿¿HAY QUE CREAR UN CATEGORY/CREATE POST???
//GET /category/:id  ¿¿¿QUE HACE ESTA RUTA???
router.get('/:id', categoryControllers.getCategoryId)
//GET /category/:id/update
router.get('/:id/update', categoryControllers.getCategoryUpdate)
//POST /category/:id/delete
router.post('/:id/delete', categoryControllers.getCategoryDelete)

module.exports = router

