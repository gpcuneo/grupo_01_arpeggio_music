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
let getDetail= async (req, res)=>{
    let userInfo = userTools.isLogged(req);
    const articles = await db.Product.findAll({nest:true, include:['category']})
    const product = await db.Product.findByPk(req.params.id)
    product.image = JSON.parse(product.image).map(image => '/images/productos/'+image)
    product.colors = JSON.parse(product.colors)
    console.log(product.stock);
    articles.forEach(article =>{
        article.image = JSON.parse(article.image).map(imgName => '/images/productos/' + imgName);
    })
    //const productID = Number(req.params.id);
    /* let articles = products;
    let indice = articles.findIndex(({id}) => id === productID);
    let product = articles.splice(indice,1)[0]; */
    res.render('products/productDetail', {title:'Detalle del Producto',product, articles,'user':userInfo});
}
let deleteProduct = async (req, res)=>{
    try {
        const deleteProduct = await db.Product.destroy({where:{id:req.params.id}})
        console.log(deleteProduct);
    } catch (error) {
        console.log(error);
    }
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
    const product = await db.Product.findByPk(req.params.id)
    product.image = JSON.parse(product.image).map(image => '/images/productos/'+image)
    product.colors = JSON.parse(product.colors)
    let userInfo = userTools.isLogged(req);
    console.log(product.image);

    /* let products = jsonTools.read('articles.json');
    const id = Number(req.params.id);
    const modifyProduct = products.find(currentProduct => currentProduct.id === id);
    console.log(modifyProduct); */
    res.render('products/productManipulation', {action:'update',product,'user':userInfo,colors,categorys})
}
let postProducts = async(req, res) =>{
    const categorys= await db.Category.findAll({raw:true})
    const colors = await db.Color.findAll({raw:true})
    const resultValidation = validationResult(req);
    let userInfo = userTools.isLogged(req);
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
    const newProduct = {
        name:req.body.name,
        characteristics:req.body.characteristics,
        price:parseInt(req.body.price),
        discount:parseInt(req.body.discount),
        stock:parseInt(req.body.stock),
        category_id:parseInt(req.body.category),
        description:req.body.description,
        store:req.body.store,
        image:JSON.stringify(req.files.map(file => file.filename)),
        colors:JSON.stringify(req.body.colors),
        trademark:req.body.trademark,
    }
    const create = await db.Product.create(newProduct)
    console.log(create);
    res.redirect('/products');
}
let putUpDate = async (req,res)=>{
    const categorys= await db.Category.findAll({raw:true})
    const dbcolors = await db.Color.findAll({raw:true})
    const product = await db.Product.findByPk(req.params.id)
    /* const id = Number(req.params.id); */
    /* const modifyProduct = products.find(currentProduct => currentProduct.id === id); */
    const resultValidation = validationResult(req);
    //const img = req.files && req.files.length>0?  req.files.map(file => '/image/productos/'+file.filename): product.img;
    let userInfo = userTools.isLogged(req);
    console.log(req.body.image);
    console.log(req.body);
    
    if(resultValidation.errors.length > 0){
        return res.render('products/productManipulation',{
            errors:resultValidation.mapped(),
            oldData: req.body,
            action:'update',
            product,
            'user':userInfo,
            categorys,
            'colors':dbcolors
        })
    }
    const newData = {
        image:JSON.stringify(req.files.map(file => file.filename)),
        colors:JSON.stringify(req.body.colors),
    }
    const updateProduct = await db.Product.update(newData,{
        where:{
            id:req.params.id
        }
    })
    console.log(updateProduct);
    /* const newData = req.body;
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
    jsonTools.write('articles.json', products); */
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