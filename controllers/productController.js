const jsonTools = require('../utils/JSONTools');
const {validationResult} = require('express-validator');
const userTools = require('../utils/User')
const db = require('../database/models')

let getProduct =  async (req, res)=>{
    let userInfo = userTools.isLogged(req);
    const products = await db.Product.findAll({nest:true, include:['category']})
    const categorys= await db.Category.findAll({raw:true})
    products.forEach(product =>{
        product.image = JSON.parse(product.image).map(imgName => '/images/productos/' + imgName);
    })
    res.render('products/productList', {products, 'user':userInfo, categorys});
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
let getCreate = async (req, res)=>{
    const categorys = await db.Category.findAll({raw:true});
    const colors = await db.Color.findAll({raw:true})
    let userInfo = userTools.isLogged(req);
    res.render('products/productManipulation', {action:'create', 'product':false,'user':userInfo, categorys,colors})
}

let getUpDate = async (req, res)=>{
    const categorys= await db.Category.findAll({raw:true})
    const colors = await db.Color.findAll({raw:true})
    let products = jsonTools.read('articles.json');
    let userInfo = userTools.isLogged(req);
    const id = Number(req.params.id);
    const modifyProduct = products.find(currentProduct => currentProduct.id === id);
    console.log(modifyProduct);
    res.render('products/productManipulation', {action:'update','product': modifyProduct,'user':userInfo,colors,categorys})
}
let postProducts = async(req, res) =>{
    const categorys= await db.Category.findAll({raw:true})
    const colors = await db.Color.findAll({raw:true})
    const resultValidation = validationResult(req);
    let userInfo = userTools.isLogged(req);
    console.log(req.body);

    if(resultValidation.errors.length > 0){
        return res.render('products/productManipulation',{
            errors:resultValidation.mapped(),
            oldData: req.body,
            action:'create',
            'product':false,
            'user':userInfo,
            categorys,
            colors
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
let putUpDate = async (req,res)=>{
    let products = jsonTools.read('articles.json');
    const categorys= await db.Category.findAll({raw:true})
    const dbcolors = await db.Color.findAll({raw:true})
    const id = Number(req.params.id);
    const modifyProduct = products.find(currentProduct => currentProduct.id === id);
    const resultValidation = validationResult(req);
    //const img = req.files && req.files.length>0?  req.files.map(file => '/image/productos/'+file.filename): modifyProduct.img;
    let userInfo = userTools.isLogged(req);
    console.log(req.body);
    if(resultValidation.errors.length > 0){
        return res.render('products/productManipulation',{
            errors:resultValidation.mapped(),
            oldData: req.body,
            action:'update',
            'product':modifyProduct,
            'user':userInfo,
            categorys,
            'colors':dbcolors
        })
    }
    const newData = req.body;
    const index = products.findIndex(product => product.id === id);
    const {name,category,price,stock,colors,img,characteristics,discount,description,store} =newData;
    products[index] = {
        id:products[index].id,
        name,
        category,
        price,
        stock,
        colors,
        characteristics,
        discount,
        img,
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