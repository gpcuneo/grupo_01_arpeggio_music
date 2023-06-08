const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categoryController');

//GET /category
router.get('/', categoryControllers.getCategory)
//POST /category
router.post('/', categoryControllers.postCategory)
//GET /category/create
router.get('/create', categoryControllers.getCategoryCreate)
<<<<<<< HEAD
//GET /category/:id
=======
//¿¿¿HAY QUE CREAR UN CATEGORY/CREATE POST???
//GET /category/:id  ¿¿¿QUE HACE ESTA RUTA??? te muestra una categoria determinada
>>>>>>> e516fd2a415875fb296345399fbf92c122f9f7d9
router.get('/:id', categoryControllers.getCategoryId)
//GET /category/:id/update
router.get('/:id/update', categoryControllers.getCategoryUpdate)
//POST /category/:id/delete
router.delete('/:id/delete', categoryControllers.getCategoryDelete)


module.exports = router

