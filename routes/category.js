const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categoryController');
const multer = require ('multer')
const categoryMiddleware = require ('../middlewares/validationsCategory')
const indexAdmin = require ('../middlewares/index')
const storage = multer.diskStorage({
    destination: (req, file , cb) =>{
        
        cb(null,'./public/images/categories' )

    },
    filename: (req,file,cb) =>{
        
        cb (null,Date.now() + '-' + file.originalname)

    }
})
const upload = multer ({storage})
const validation = categoryMiddleware.validateCreateCategory 
const isAdmin = indexAdmin.authorizationMiddleware.isAdmin

//GET /category
router.get('/',isAdmin ,categoryControllers.getCategory)
//POST /category
router.post('/',upload.single('img') ,validation ,categoryControllers.postCategory)
//GET /category/create

router.get('/create',isAdmin,categoryControllers.getCategoryCreate)

//GET /category/:id 
router.get('/:id',isAdmin ,categoryControllers.getCategoryId)
//POST /category/:id/delete
router.get('/:id/delete',isAdmin ,categoryControllers.getCategoryDelete1)
router.delete('/:id',isAdmin, categoryControllers.getCategoryDelete2)
//GET /category/:id/update
router.get('/:id/update',isAdmin ,categoryControllers.getCategoryUpdate)
//PUT /category/:id/update
router.put('/:id/update',upload.single('img'),validation ,isAdmin,categoryControllers.putCategoryUpdate)

module.exports = router

