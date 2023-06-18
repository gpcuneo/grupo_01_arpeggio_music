const express = require('express');
const session = require('express-session');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const middlewares = require('./middlewares/index');
require('dotenv').config();

app.set('view engine', 'ejs')
const publicPath = path.resolve(__dirname, './public');

app.use( express.static(publicPath) );
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret: process.env.APP_SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(middlewares.authenticationMiddleware);

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products');
const indexRoutes = require('./routes/index');
const categoryRoutes = require('./routes/category')
const aboutRoutes = require('./routes/about');
const cartRoutes = require('./routes/cart');
const historyRoutes = require('./routes/history');
const mainRoutes = require('./routes/main');
const { log } = require('console');

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`) );

app.use('/user', userRoutes);
app.use('/productCart',cartRoutes);
app.use('/products', productRoutes);
app.use('/category',categoryRoutes);
app.use('/history',historyRoutes);
app.use('/', mainRoutes);