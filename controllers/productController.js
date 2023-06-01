const jsonTools = require('../utils/JSONTools');


let getProduct = (req, res)=>{
    let products = jsonTools.read('articles.json');

    res.render('productList', {products});
}
let getDetail=(req, res)=>{
    let products = jsonTools.read('articles.json');
    const productID = Number(req.params.id);
    let articles = products;
    let indice = articles.findIndex(({id}) => id === productID);
    let product = articles.splice(indice,1)[0];
    res.render('productDetail', {title:'Detalle del Producto',product, articles});
}
let deleteProduct = (req, res)=>{
    let products = jsonTools.read('articles.json');
    const id = Number(req.params.id);

    const newProducts = products.filter(currentProduct => currentProduct.id !==id);
    let newListProducts = newProducts;
    console.log(newListProducts);
    res.send("se quiere eliminar un producto");
    /* res.redirect('/products') */
}
let getCreate = (req, res)=>{
    res.render('productManipulation', {action:'create'})
}

let getUpDate = (req, res)=>{
    res.render('productManipulation', {action:'update'})
}
let postProducts = (req, res) =>{
    const datos = req.body;
    let products = jsonTools.read('articles.json');
    datos.id = products.length + 1;
    products.push(datos);
    /* res.json(products); */
    res.redirect('/products');
}
let putUpDate = (req,res)=>{
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