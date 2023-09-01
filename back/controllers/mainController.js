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

const storePOST = async (req, res) => {
    console.log(' ------ STORE -------- ');
    console.log(req.body);
    console.log(req.query);

    return res.json('ok')
}

const buildQueryByParams = (brandsChecked, categoriesCheckd) => {
    let query = {
        order: [fn( 'RAND' ),],
        where: {}
    }
    brandsChecked ? query.where.trademark_id = brandsChecked : '';
    categoriesCheckd ? query.where.category_id = categoriesCheckd : '';
    return query;
}

const reqQueryToArrayOfNumbers = (dataInReqQuery) => {
    let data = dataInReqQuery;
    if(data) {
        console.log(data) 
        typeof(data) === 'string'? data = [data] : '';
        return data.map( item => parseInt(item) );
    } else {
        return data;
    }
}

const store = async (req, res) => {  
    const userInfo = userTools.isLogged(req);
    const brandsChecked = reqQueryToArrayOfNumbers(req.query.brands);
    const categoriesCheckd = reqQueryToArrayOfNumbers(req.query.category);
    const query = buildQueryByParams(brandsChecked, categoriesCheckd);
    const products = await db.Product.findAll(query);
    // Field images string to array.
    products.forEach(product =>{
        product.image = JSON.parse(product.image);
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
    console.log('brandsChecked')
    console.log(brandsChecked)
    res.render('store', {products, brands, categories, user: userInfo, brandsChecked, categoriesCheckd});
} 

const mainController = {
    home: home,
    store: store,
    about: about,
    shipping: shipping,
    error: error,
    storePOST: storePOST
}

module.exports = mainController;