const userTools = require('../utils/User')
const db = require('../database/models');

// Dummy data
const products = [
    {id: '1', name: 'Guittarra criolla', details: 'Guitarra electrica lorem lorem lorem', price: '274000', image: '/images/productos/guitarra02.png'},
    {id: '2', name: 'Guitarra electrica', details: 'Guitarra electrica lorem lorem lorem', price: '310000', image: '/images/productos/guitarra01.png'},
    {id: '3', name: 'Piano', details: 'Piano muchas teclasm lorem lorem lorem', price: '570342', image: '/images/productos/piano.png'},
    {id: '4', name: 'Violin', details: 'Violin lorem lorem lorem lorem', price: '325738', image: '/images/productos/violin.png'}
]

const home = async (req, res) => {
    const categories = await db.Category.findAll({limit: 8 })
    let userInfo = userTools.isLogged(req);
    res.render('index', {products: products, user: userInfo, categories});
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

const store = (req, res) => {
    let userInfo = userTools.isLogged(req);
    res.render('store', {products: products, user: userInfo});
} 

const mainController = {
    home: home,
    store: store,
    about: about,
    shipping: shipping,
    error: error
}

module.exports = mainController;