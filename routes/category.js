const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categoryController');
const multer = require ('multer')
const storage = multer.diskStorage({
    destination: (req, file , cb) =>{
        
        cb(null,'./public/images/categories' )

    },
    filename: (req,file,cb) =>{
        
        cb (null,Date.now() + '-' + file.originalname)

    }
})
const upload = multer ({storage})

//GET /category
router.get('/', categoryControllers.getCategory)
//POST /category
router.post('/',upload.single('img') , categoryControllers.postCategory)
//GET /category/create

router.get('/create',categoryControllers.getCategoryCreate)

//GET /category/:id 
router.get('/:id', categoryControllers.getCategoryId)
//POST /category/:id/delete
router.get('/:id/delete', categoryControllers.getCategoryDelete1)
router.delete('/:id', categoryControllers.getCategoryDelete2)
//GET /category/:id/update
router.get('/:id/update', categoryControllers.getCategoryUpdate)


module.exports = router

