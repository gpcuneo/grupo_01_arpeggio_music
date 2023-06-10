const path = require ('path')
const categoryModel = require('../models/category');
const { log } = require('console');



const categoryControllers = {
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
    getCategoryId: (req, res) => { //falta
        const id = Number(req.params.id);
        const categoriaAMostrar = categoryModel.findById(id)
     
        if (!categoriaAMostrar){
            return res.send ('Error de id')
        }
        res.render ('categoryDetail'), {title: 'Detalle de la categoria', category:categoriaAMostrar}
       
    },
    getCategoryCreate: (req, res) => {
        
        res.render('categoryEdit', {action:'create'})
    },
    getCategoryUpdate: (req,res) => {
        const id = Number(req.params.id);
        //const categoryUpDate = categoryList.find(categoryActual => categoryActual.id === id);
        const categoryUpDate = categoryModel.findById(id)

       
        if(!categoryUpDate) {
            return res.send('error de ID)')
        };

        res.render ('categoryEdit', {category:categoryUpDate, action:'update'})
    },
    getCategoryDelete: (req, res) => { //falta
        const id = Number(req.params.id);
        const categoryDelete = categoryList.filter(categoryActual => categoryActual.id !== id);
        categoryList = categoryDelete;
        res.redirect('/category')
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