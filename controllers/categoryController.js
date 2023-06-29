const path = require ('path')
const categoryModel = require('../models/category');
const expressValidator = require ('express-validator')
const userTools = require('../utils/User')
const { log } = require('console');



const categoryControllers = {
    // /category
    getCategory: (req, res) => {
        const categorias = categoryModel.findAll();
        let userInfo = userTools.isLogged(req);
        res.render('category', {'categoryList': categorias,user: userInfo})
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
        let userInfo = userTools.isLogged(req);
        const id = Number(req.params.id);
        const categoriaAMostrar = categoryModel.findById(id)
       
     
        if (!categoriaAMostrar){
            return res.send ('Error de id')

        }
        res.render ('categoryDetail',{category:categoriaAMostrar,title: 'Detalle de la categoria',user: userInfo }) 
       
    },
    // /category/create
    getCategoryCreate: (req, res) => {
        let userInfo = userTools.isLogged(req);
        res.render('categoryEdit', {errors:[],action:'create',user: userInfo})
    },
    // /category/:id/update
    getCategoryUpdate: (req,res) => {
        let userInfo = userTools.isLogged(req);
        const id = Number(req.params.id);
        //const categoryUpDate = categoryList.find(categoryActual => categoryActual.id === id);
        const categoryUpDate = categoryModel.findById(id)
        

        if(!categoryUpDate) {
            return res.send('error de ID)')
        }

        res.render ('categoryEdit', {category:categoryUpDate,errors:[], action:'update',user: userInfo})
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
        let userInfo = userTools.isLogged(req);
        const id = Number(req.params.id);
        const categoriaAMostrar = categoryModel.findById(id)
        console.log(categoriaAMostrar)
     
        if (!categoriaAMostrar){
            return res.send ('Error de id')

        }
        res.render ('categoryDelete',{title:'eliminar categoria',category:categoriaAMostrar,user: userInfo }) 
       
    },
     // /category
    getCategoryDelete2: (req, res) => { //falta
        const id = Number(req.params.id);
        categoryModel.deleteById(id);

        res.redirect('/category');
    },
}

module.exports = categoryControllers;