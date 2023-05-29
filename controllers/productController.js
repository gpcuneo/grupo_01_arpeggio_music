const jsonTools = require('../utils/JSONTools');


let getDetail=(req, res)=>{
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
    res.render('productManipulation', {action:'create'})
}

let getUpDate = (req, res)=>{
    res.render('productManipulation', {action:'update'})
}
let postProducts = (req, res) =>{
    res.render()
}
let upDate = (req,res)=>{
    res.render()
}
/* let getId = (req, res)=>{
    res.render('productDetail', {title:'Detalle del Producto',product, articles})
} */
const productController={
    product:getDetail,
    postProduct:postProducts,
    showbyid:getDetail,
    create:getCreate,
    update:upDate,
    getUpDate:getUpDate,
    delete:getDelete,
}


module.exports=productController;