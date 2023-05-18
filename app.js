const express = require('express');
const path = require('path')

const app = express();
const port = 3000;

app.set('view engine', 'ejs')
const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) );

// Importamos o requirimos el modulo de rutas de usuario (Creado por nosotros).
const userRoutes = require('./routes/user');
const productRoutes=require('./routes/products')
const indexRoutes=require('./routes/index');


const returnView = (req, res, viewName) => res.sendFile(path.resolve(__dirname, `./views/${viewName}.html`) );

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`) );



app.get('/productCart', (req, res) => returnView(req, res, req.path));
app.use('/products', productRoutes);

/* app.get('/productDetail', (req, res) => returnView(req, res, req.path)); */

app.get('/userLogin', (req, res) => returnView(req, res, req.path));

// indicamos que las peticiones que lleguen con solicitud de /user se envien a ese modulo.
app.use('/user', userRoutes);
app.use ('/',indexRoutes)

app.get('/userRegister', (req, res) => returnView(req, res, req.path));

app.get('/store', (req, res) => returnView(req, res, req.path));

app.get('/shoppingHistory', (req, res) => returnView(req, res, req.path));

app.get('/about', (req, res) => returnView(req, res, req.path));

app.get('/shipping', (req, res) => returnView(req, res, req.path));

app.get('*', (req, res) => returnView(req, res, '404'));

