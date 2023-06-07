const jsonTools = require('../utils/JSONTools');


let getProduct = (req, res)=>{
    let products = jsonTools.read('articles.json');

    res.render('products/productList', {products});
}
let getDetail=(req, res)=>{
    let products = jsonTools.read('articles.json');
    const productID = Number(req.params.id);
    let articles = products;
    let indice = articles.findIndex(({id}) => id === productID);
    let product = articles.splice(indice,1)[0];
    res.render('products/productDetail', {title:'Detalle del Producto',product, articles});
}
let deleteProduct = (req, res)=>{
    let products = jsonTools.read('articles.json');
    const id = Number(req.params.id);

    const newProducts = products.filter(currentProduct => currentProduct.id !==id);
    let newListProducts = newProducts;
    jsonTools.write('articles.json', newListProducts)
    console.log('se elimino un producto');
    /* res.send("se quiere eliminar un producto"); */
    res.redirect('/products')
}
let getCreate = (req, res)=>{
    res.render('products/productManipulation', {action:'create', 'product':false})
}

let getUpDate = (req, res)=>{
    let products = jsonTools.read('articles.json');
    const id = Number(req.params.id);
    const modifyProduct = products.find(currentProduct => currentProduct.id === id);
    /* console.log(modifyProduct); */

    res.render('products/productManipulation', {action:'update','product': modifyProduct})
}
let postProducts = (req, res) =>{
    const datos = req.body;
    let products = jsonTools.read('articles.json');
    datos.id = products[products.length - 1].id + 1;
    datos.price = Number(datos.price);
    datos.discount = Number(datos.discount);
    datos.stock = Number(datos.stock);
    products.push(datos);
    jsonTools.write('articles.json', products)
    /* res.json(products); */
    res.redirect('/products');
}
let putUpDate = (req,res)=>{
    let products = jsonTools.read('articles.json');
    const id = Number(req.params.id);
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
    /* console.log(products); */
    /* res.send('se quiere actualizar un producto'); */
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