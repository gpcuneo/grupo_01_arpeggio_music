const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categoryController');
const multer = require ('multer')
const storage = multer.diskStorage({
    destination: (req, res , cb) =>{
        
        cb(null,'./public/images/categories' )

    },
    filename: (req,res,cb) =>{
        
        cb (null,Date.now()+'-'+ file.originalname)

    }
})
const upload = multer ({storage})

//GET /category
router.get('/', categoryControllers.getCategory)
//POST /category
router.post('/', categoryControllers.postCategory)
//GET /category/create

router.get('/create',upload.single('img') ,categoryControllers.getCategoryCreate)

//GET /category/:id  ¿¿¿QUE HACE ESTA RUTA??? te muestra una categoria determinada
router.get('/:id/detail', categoryControllers.getCategoryId)

//GET /category/:id/update
router.get('/:id/update', categoryControllers.getCategoryUpdate)
//POST /category/:id/delete
router.delete('/:id/delete', categoryControllers.getCategoryDelete)


module.exports = router

