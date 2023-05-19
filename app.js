const express = require('express');
const path = require('path')

const app = express();
const port = 3000;

app.set('view engine', 'ejs')
const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) );

// Importamos o requirimos el modulo de rutas de usuario (Creado por nosotros).
const userRoutes = require('./routes/user');
const productRoutes=require('./routes/products');
const indexRoutes=require('./routes/index');
const productCatRoutes=require ('./routes/productCat')
const newProductRoutes=require ('./routes/newProduct')
const aboutRoutes=require('./routes/about');
const cartRoutes = require('./routes/cart');
const productCatRoutes=require ('./routes/productCat');
const historyRoutes = require('./routes/history');
const editproductRoutes=require('./routes/editProduct')

const returnView = (req, res, viewName) => {
    console.log(viewName);
    let vista = path.resolve(__dirname, `./views/${viewName}.html`);
    console.log(vista)
    res.sendFile(vista)
};

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`) );



app.use ('/newProduct', newProductRoutes)
app.use('/productCart',cartRoutes);
app.use('/products', productRoutes);
app.use('/productCat',productCatRoutes);


app.get('/userLogin', (req, res) => returnView(req, res, req.path));


// indicamos que las peticiones que lleguen con solicitud de /user se envien a ese modulo.
app.use('/user', userRoutes);
app.use ('/',indexRoutes)
app.use('/History',historyRoutes);

app.get('/productCart', (req, res) => returnView(req, res, req.path));

app.get('/userRegister', (req, res) => returnView(req, res, req.path));

app.use('/store', (req, res) => returnView(req, res, 'store'));

app.get('/about', (req, res) => returnView(req, res, req.path));

app.get('/shipping', (req, res) => returnView(req, res, req.path));

app.get('*', (req, res) => returnView(req, res, '404'));


app.get('/editproduct', (req, res) => returnView(req, res, req.path));
