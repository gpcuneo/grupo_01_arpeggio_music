const jsonTools = require('../utils/JSONTools');
const {validationResult} = require('express-validator');
const userTools = require('../utils/User')


let getProduct = (req, res)=>{
    let products = jsonTools.read('articles.json');
    let userInfo = userTools.isLogged(req);

    res.render('products/productList', {products, 'user':userInfo});
}
let getDetail=(req, res)=>{
    let products = jsonTools.read('articles.json');
    let userInfo = userTools.isLogged(req);
    const productID = Number(req.params.id);
    let articles = products;
    let indice = articles.findIndex(({id}) => id === productID);
    let product = articles.splice(indice,1)[0];
    res.render('products/productDetail', {title:'Detalle del Producto',product, articles,'user':userInfo});
}
let deleteProduct = (req, res)=>{
    let products = jsonTools.read('articles.json');
    const id = Number(req.params.id);

    const newProducts = products.filter(currentProduct => currentProduct.id !==id);
    let newListProducts = newProducts;
    jsonTools.write('articles.json', newListProducts)
    console.log('se elimino un producto');
    res.redirect('/products')
}
let getCreate = (req, res)=>{
    let userInfo = userTools.isLogged(req);
    res.render('products/productManipulation', {action:'create', 'product':false,'user':userInfo})
}

let getUpDate = (req, res)=>{
    let products = jsonTools.read('articles.json');
    let userInfo = userTools.isLogged(req);
    const id = Number(req.params.id);
    const modifyProduct = products.find(currentProduct => currentProduct.id === id);

    res.render('products/productManipulation', {action:'update','product': modifyProduct,'user':userInfo})
}
let postProducts = (req, res) =>{
    const resultValidation = validationResult(req);
    let userInfo = userTools.isLogged(req);
    if(resultValidation.errors.length > 0){
        return res.render('products/productManipulation',{
            errors:resultValidation.mapped(),
            oldData: req.body,
            action:'create',
            'product':false,
            'user':userInfo
        })
    }

    const datos = req.body;
    let products = jsonTools.read('articles.json');
    datos.id = products[products.length - 1].id + 1;
    datos.price = Number(datos.price);
    datos.discount = Number(datos.discount);
    datos.stock = Number(datos.stock);
    datos.img = req.files.map(file => '/images/productos/'+ file.filename);
    products.push(datos);
    jsonTools.write('articles.json', products)
    res.redirect('/products');
}
let putUpDate = (req,res)=>{
    let products = jsonTools.read('articles.json');
    const id = Number(req.params.id);
    const modifyProduct = products.find(currentProduct => currentProduct.id === id);
    const resultValidation = validationResult(req);
    let userInfo = userTools.isLogged(req);
    if(resultValidation.errors.length > 0){
        return res.render('products/productManipulation',{
            errors:resultValidation.mapped(),
            oldData: req.body,
            action:'update',
            'product':modifyProduct,
            'user':userInfo
        })
    }
    const newData = req.body;
    const index = products.findIndex(product => product.id === id);

    const {name,category,price,stock,colors,characteristics,img,discount,description,store} =newData;
    products[index] = {
        id:products[index].id,
        name,
        category,
        price,
        stock,
        colors,
        characteristics,
        img,
        discount,
        description,
        store
    }
    jsonTools.write('articles.json', products);
    res.redirect('/products')
}
const productController={
    product:getProduct,
    postProduct:postProducts,
    showbyid:getDetail,
    create:getCreate,
    update:putUpDate,
    getUpDate:getUpDate,
    delete:deleteProduct,
}


module.exports=productController;