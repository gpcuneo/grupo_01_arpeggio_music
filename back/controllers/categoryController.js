const expressValidator = require ('express-validator')
const userTools = require('../utils/User')
const db = require('../database/models');
const user = require('../utils/User');



const categoryControllers = {
    // /category
    getCategory: async (req, res) => {
        const categorias = await db.Category.findAll({attributes: ['id', 'name', 'img']});
        let userInfo = userTools.isLogged(req);
        res.render('categorys/category', {'categoryList': categorias, user: userInfo})
    },
    postCategory: (req, res) => {
        let datos = req.body;
        const validations = expressValidator.validationResult(req);
       
        let userInfo = userTools.isLogged(req);

        if(validations.errors.length > 0){
            return res.render('categorys/categoryEdit', { errors: validations.errors, values: req.body,user: userInfo , action:'create' });
        }

        if(req.file) {
            datos.img = req.file.filename
        }
        
        db.Category.create(datos);
        res.redirect('/category')
    },
    // /category/:id/detail
    getCategoryId: async (req, res) => { //falta
        let userInfo = userTools.isLogged(req);
        const categoriaAMostrar = await db.Category.findOne({ 
            where: { id: req.params.id }
        });
       
        if (!categoriaAMostrar){
            return res.send ('Error de id')
        }
        res.render ('categorys/categoryDetail',{category:categoriaAMostrar,title: 'Detalle de la categoria',user: userInfo }) 
       
    },
    // /category/create
    getCategoryCreate: (req, res) => {
        let userInfo = userTools.isLogged(req);
        res.render('categorys/categoryEdit', {errors:[],action:'create',user: userInfo})
    },
    // /category/:id/update
    getCategoryUpdate: async (req,res) => {
        let userInfo = userTools.isLogged(req);
        const categoryUpDate = await db.Category.findOne({ 
            where: { id: req.params.id }
        });

        if(!categoryUpDate) {
            return res.send('error de ID)')
        }

        res.render ('categorys/categoryEdit', {category:categoryUpDate,errors:[], action:'update',user: userInfo})
    },
     // /category/:id/update
     putCategoryUpdate: async (req,res) => {
        let userInfo = userTools.isLogged(req);
        const categoryUpDate = await db.Category.findOne({ 
            where: { id: req.params.id }
        });

        const validations = expressValidator.validationResult(req);

        if(validations.errors.length > 0){
            return res.render('categorys/categoryEdit', { errors: validations.errors, values: req.body ,user:userInfo ,action:'update',category:categoryUpDate });
        }

        let datos = req.body;

        if(req.file) {
            datos.img = req.file.filename
        }
        
        await db.Category.update(datos, {
            where: { id: req.params.id },
            returning: false
        });

        res.redirect('/category')
    },
    getCategoryDelete1: async (req, res) => { 
        let userInfo = userTools.isLogged(req);
        const categoriaAMostrar = await db.Category.findOne({ 
            where: { id: req.params.id }
        });
        console.log(categoriaAMostrar)
     
        if (!categoriaAMostrar){
            return res.send ('Error de id')

        }
        res.render ('categorys/categoryDelete',{title:'eliminar categoria',category:categoriaAMostrar,user: userInfo }) 
       
    },
     // /category
    getCategoryDelete2: async (req, res) =>  {
        const categoryDelete = await db.Category.destroy({
            where : {id:req.params.id}
        }) //TODO falta
        
       console.log(categoryDelete);
        //categoryModel.deleteById(id); //TODO definir si se hace borrado logico o no

        res.redirect('/category');
    },
}

module.exports = categoryControllers;