const jsonTools = require('../utils/JSONTools')
let product = jsonTools.read('productDetail.json');
let articles = jsonTools.read('articles.json');


let getDetail=(req, res)=>{
    res.render('productDetail', {title:'Detalle del Producto',product, articles});
}
let getDelete = (req, res)=>{
    res.render('productDelete')
}
let getCreate = (req, res)=>{
    res.render('product', {action:'create'})
}

let getUpDate = (req, res)=>{
    res.render('product', {action:'update'})
}
let getId = (req, res)=>{
    if(req.params.id){
        /* console.log(req.params.id) */
    }
    res.render('productDetail', {title:'Detalle del Producto',product, articles})
}
const productController={
    product:getDetail,
    showbyid:getId,
    create:getCreate,
    update:getUpDate,
    delete:getDelete,
}


module.exports=productController;