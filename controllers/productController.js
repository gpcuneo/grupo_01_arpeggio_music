const jsonTools = require('../utils/JSONTools')
/* let product = jsonTools.read('productDetail.json');
let articles = jsonTools.read('articles.json'); */


let getDetail=(req, res)=>{
    /* let products = readJSON('articles.json'); */
    let products = jsonTools.read('articles.json');
    const productID = Number(req.params.id);
    let articles = products;
    let indice = articles.findIndex(({id}) => id === productID);
    let product = articles.splice(indice,1)[0];
    /* console.log(product);
    console.log(articles); */
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
/* let getId = (req, res)=>{
    res.render('productDetail', {title:'Detalle del Producto',product, articles})
} */
const productController={
    product:getDetail,
    showbyid:getDetail,
    create:getCreate,
    update:getUpDate,
    delete:getDelete,
}


module.exports=productController;