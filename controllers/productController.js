const readJSON = require('../utils/readJSON')
let products = readJSON('articles.json');
/* let articles = readJSON('articles.json'); */

/* let productID = 3; // req.params.id;
    let articles = productos;
    let indice = articles.findIndex( ({id}) => id === productID );
    let product = articles.splice(indice, 1); // Indice del arreglo, la cantidad de posiciones */
let getDetail=(req, res)=>{
    /* const productID = Number(req.params.id); */
    const productID = 1;
    let articles = products;
    let indice = articles.findIndex(({id}) => id === productID);
    let product = articles.splice(indice,1);
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
    /* showbyid:getId, */
    create:getCreate,
    update:getUpDate,
    delete:getDelete,
}


module.exports=productController;