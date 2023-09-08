const express = require('express');
const session = require('express-session');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const cookieParser = require('cookie-parser');
const middlewares = require('./middlewares/index');
require('dotenv').config();
const port = process.env.APP_PORT;

app.set('view engine', 'ejs')
const publicPath = path.resolve(__dirname, './public');




const  {aboutRoute,
adminRoute,
apiRoute,
cartRoute, 
categoryRoute, 
historyRoute ,
indexRoute,
mainRoute ,
productRoute, 
userRoute ,
} = require ('./routes')


const { log } = require('console');


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
app.use(middlewares.loggerMiddleware);
app.use(middlewares.authenticationMiddleware.auth);




app.use('/user', userRoute);
app.use('/productCart',cartRoute);
app.use('/products', productRoute);
app.use('/category',categoryRoute);
app.use('/orderHistory',historyRoute);
app.use('/api', apiRoute);
app.use('/admin', adminRoute);
app.use('/', mainRoute);

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`) );