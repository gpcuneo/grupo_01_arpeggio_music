const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, './public/images/productos')
    },
    filename: (req,file,cb) =>{
        console.log(path.extname(file.originalname));  //es una manera de acceder a la extension
        cb (null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage});
//GET /products  
router.get('/', productController.product);

//POST /products 
router.post('/', upload.any('img'), productController.postProduct);

//GET /products/:id/detail
router.get('/:id/detail', productController.showbyid);

//GET /products/create
router.get('/create', productController.create);

//PUT /products/:id/update
router.put('/:id/update', productController.update);

//GET /products/:id/update
router.get('/:id/update', productController.getUpDate);

//DELETE /products/:id/delete 
router.delete('/:id/delete', productController.delete);

module.exports=router;