const path = require ('path')
const categoryModel = require('../models/category');
const expressValidator = require ('express-validator')
const { log } = require('console');



const categoryControllers = {
    // /category
    getCategory: (req, res) => {
        const categorias = categoryModel.findAll();
        res.render('category', {'categoryList': categorias})
    },
    postCategory: (req, res) => {
        let datos = req.body;
        const validations = expressValidator.validationResult(req);

        if(validations.errors.length > 0){
            return res.render('categoryEdit', { errors: validations.errors, values: req.body , action:'create' });
        }

        if(req.file) {
            datos.img = '/images/categories/'+ req.file.filename
        }
        
       categoryModel.createOne(datos)
        res.redirect('/category')
    },
    // /category/:id/detail
    getCategoryId: (req, res) => { //falta
        const id = Number(req.params.id);
        const categoriaAMostrar = categoryModel.findById(id)
        console.log(categoriaAMostrar)
     
        if (!categoriaAMostrar){
            return res.send ('Error de id')

        }
        res.render ('categoryDetail',{category:categoriaAMostrar,title: 'Detalle de la categoria' }) 
       
    },
    // /category/create
    getCategoryCreate: (req, res) => {
        res.render('categoryEdit', {errors:[],action:'create'})
    },
    // /category/:id/update
    getCategoryUpdate: (req,res) => {
        const id = Number(req.params.id);
        //const categoryUpDate = categoryList.find(categoryActual => categoryActual.id === id);
        const categoryUpDate = categoryModel.findById(id)
        

        if(!categoryUpDate) {
            return res.send('error de ID)')
        }

        res.render ('categoryEdit', {category:categoryUpDate,errors:[], action:'update'})
    },
     // /category/:id/update
     putCategoryUpdate: (req,res) => {
       
        const id = Number(req.params.id);
        const categoryUpDate = categoryModel.findById(id);

        const validations = expressValidator.validationResult(req);

        if(validations.errors.length > 0){
            return res.render('categoryEdit', { errors: validations.errors, values: req.body , action:'update',category:categoryUpDate });
        }

        let datos = req.body;

        if(req.file) {
            datos.img = '/images/categories/'+ req.file.filename
        }
        
       categoryModel.updateById(id, datos)
        res.redirect('/category')
    },
    getCategoryDelete1: (req, res) => { //falta
        const id = Number(req.params.id);
        const categoriaAMostrar = categoryModel.findById(id)
        console.log(categoriaAMostrar)
     
        if (!categoriaAMostrar){
            return res.send ('Error de id')

        }
        res.render ('categoryDelete',{title:'eliminar categoria',category:categoriaAMostrar }) 
       
    },
     // /category
    getCategoryDelete2: (req, res) => { //falta
        const id = Number(req.params.id);
        categoryModel.deleteById(id);

        res.redirect('/category');
    },
}

module.exports = categoryControllers;