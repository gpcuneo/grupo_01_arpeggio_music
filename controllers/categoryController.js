const path = require ('path')
const categoryModel = require('../models/category');
const { log } = require('console');



const categoryControllers = {
    // /category
    getCategory: (req, res) => {
        const categorias = categoryModel.findAll();
        res.render('category', {'categoryList': categorias})
    },
    postCategory: (req, res) => {
        let datos = req.body;
        datos.img = '/images/categories'+ req.file.filename
        
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
        
        res.render('categoryEdit', {action:'create'})
    },
    // /category/:id/update
    getCategoryUpdate: (req,res) => {
        const id = Number(req.params.id);
        //const categoryUpDate = categoryList.find(categoryActual => categoryActual.id === id);
        const categoryUpDate = categoryModel.findById(id)

       
        if(!categoryUpDate) {
            return res.send('error de ID)')
        }

        res.render ('categoryEdit', {category:categoryUpDate, action:'update'})
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

/* const categoryController = {
    show:showCategories,
    showbyid:getCategoryId,
    create:getCategoryCreate,
    update:getCategoryUpdate,
    delete:getCategoryDelete,
} */

module.exports = categoryControllers;