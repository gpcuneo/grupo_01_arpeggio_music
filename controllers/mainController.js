const userTools = require('../utils/User')
const db = require('../database/models');
const { fn } = require('sequelize');


const home = async (req, res) => {
    const categories = await db.Category.findAll({limit: 8 })
    const products = await db.Product.findAll({
        order: [
            fn( 'RAND' ),
        ],
        limit: 4,
    });
    products.forEach(product =>{
        product.image = JSON.parse(product.image).map(imgName => imgName);
    });

    const productsOfertas = await db.Product.findAll({
        order: [
            fn( 'RAND' ),
        ],
        limit: 4,
    });
    productsOfertas.forEach(product =>{
        product.image = JSON.parse(product.image).map(imgName => imgName);
    });
    let userInfo = userTools.isLogged(req);
    return res.render('index', {products, productsOfertas, user: userInfo, categories});
}

const about = (req, res) => {
    let userInfo = userTools.isLogged(req);
    res.render('about', {user: userInfo});
} 

const shipping = (req, res) => {
    let userInfo = userTools.isLogged(req);
    res.render('shipping', {user: userInfo})
} 

const error = (req, res) => {
    let userInfo = userTools.isLogged(req);
    res.render('error', {user: userInfo})
} 

const store = async (req, res) => {
    let userInfo = userTools.isLogged(req);
    const products = await db.Product.findAll({
        order: [
            fn( 'RAND' ),
        ]
    });
    products.forEach(product =>{
        product.image = JSON.parse(product.image).map(imgName => imgName);
    });
    
    const brands = await db.Trademark.findAll({
        order: [
            ['name', 'ASC']
        ]
    });

    const categories = await db.Category.findAll({
        order: [
            ['name', 'ASC']
        ]
    });
    res.render('store', {products, brands, categories, user: userInfo});
} 

const mainController = {
    home: home,
    store: store,
    about: about,
    shipping: shipping,
    error: error
}

module.exports = mainController;