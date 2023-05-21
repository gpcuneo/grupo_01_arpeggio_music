// Dummy data
const products = [
    {id: '1', name: 'Guittarra criolla', details: 'Guitarra electrica lorem lorem lorem', price: '274000', image: '/images/productos/guitarra02.png'},
    {id: '2', name: 'Guitarra electrica', details: 'Guitarra electrica lorem lorem lorem', price: '310000', image: '/images/productos/guitarra01.png'},
    {id: '3', name: 'Piano', details: 'Piano muchas teclasm lorem lorem lorem', price: '570342', image: '/images/productos/piano.png'},
    {id: '4', name: 'Violin', details: 'Violin lorem lorem lorem lorem', price: '325738', image: '/images/productos/violin.png'}
]

const home = (req, res) => res.render('index', {products: products});

const about = (req, res) => res.render('about');

const shipping = (req, res) => res.render('shipping')

const error = (req, res) => res.render('error')

const store = (req, res) => res.render('store');

const mainController = {
    home: home,
    store: store,
    about: about,
    shipping: shipping,
    error: error
}

module.exports = mainController;