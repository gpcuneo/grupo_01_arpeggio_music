const express = require('express');
const path = require('path')

const app = express();
const port = 3000;

const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) );

const returnView = (req, res, viewName) => res.sendFile(path.resolve(__dirname, `./views/${viewName}.html`) );

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`) );

app.get('/', (req, res) => returnView(req, res, 'index'));

app.get('/productCart', (req, res) => returnView(req, res, req.path));

app.get('/productDetail', (req, res) => returnView(req, res, req.path));

app.get('/userLogin', (req, res) => returnView(req, res, req.path));

app.get('/userProfile', (req, res) => returnView(req, res, req.path));

app.get('/userRegister', (req, res) => returnView(req, res, req.path));

app.get('/store', (req, res) => returnView(req, res, req.path));

app.get('/shoppingHistory', (req, res) => returnView(req, res, req.path));

app.get('*', (req, res) => returnView(req, res, '404'));