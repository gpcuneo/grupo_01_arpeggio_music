const home = (req, res) => res.render('index');

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