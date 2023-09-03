const userTools = require('../utils/User')
const db = require('../database/models');
const { fn } = require('sequelize');

const getUserID = async (userName) => {
    const userID = await db.User.findOne({
        where: { userName: userName },
        attributes: ['id']
    });
    return userID.id;
}

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
    return res.json('ok')
}

const buildQueryByParams = (limit, offset, brandsChecked, categoriesCheckd) => {
    let query = {
        limit,
        offset,
        //order: [fn( 'RAND' ),],
        where: {}
    }
    brandsChecked ? query.where.trademark_id = brandsChecked : '';
    categoriesCheckd ? query.where.category_id = categoriesCheckd : '';
    return query;
}

const reqQueryToArrayOfNumbers = (dataInReqQuery) => {
    let data = dataInReqQuery;
    if(data) {
        typeof(data) === 'string'? data = [data] : '';
        return data.map( item => parseInt(item) );
    } else {
        return data;
    }
}

const store = async (req, res) => {  
    const userInfo = userTools.isLogged(req);
    const limit = 2;
    let pageLimit = 0
    const reqPage = parseInt(req.query.page)
    let page = 0
    if(reqPage){
        page = reqPage -1
    }
    const offset = page * limit;
    const brandsChecked = reqQueryToArrayOfNumbers(req.query.brands);
    const categoriesCheckd = reqQueryToArrayOfNumbers(req.query.category);
    const query = buildQueryByParams(limit, offset, brandsChecked, categoriesCheckd);
    
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
    let productsCount;
    if(brandsChecked || categoriesCheckd) {
        let query = {
            where: {}
        }
        brandsChecked ? query.where.trademark_id = brandsChecked : '';
        categoriesCheckd ? query.where.category_id = categoriesCheckd : '';
        productsCount = await db.Product.count(query);
    } else {
        productsCount = await db.Product.count();
    }
    pageLimit = Math.ceil(productsCount / limit) -1; 
    res.render('store', {products, brands, categories, user: userInfo, brandsChecked, categoriesCheckd, page, pageLimit});
} 

const formatObjectProduct = (products) => {
    return products.map( row => {
        return {
            ...row.Product.dataValues,
            quantity: row.quantity,
            totalPriceProduct: row.quantity * row.Product.price
        }
    })
}

const sumTotalPriceProducts = (itemsArray) => {
    return itemsArray.reduce( (accumulated, currentValue) => {
        return accumulated + currentValue.totalPriceProduct
    }, 0);
}

const checkout = async (req,res) => {
    let user = userTools.isLogged(req);
    const products = await db.Cart.findAll({
        where: { userid: user.id },
        attributes: ['id', 'productid', 'quantity'],
        include: [
            {
                association: 'Product', 
                as: 'product',
                attributes: ['id', 'name', 'price', 'discount', 'stock', 'image'],
            }]
        });
    let cart ={}
    cart.products = formatObjectProduct(products);
    cart.totalPrice = sumTotalPriceProducts(cart.products);

    res.render('checkout', {user, cart});
}

const mainController = {
    home: home,
    store: store,
    about: about,
    shipping: shipping,
    error: error,
    storePOST: storePOST,
    checkout: checkout
}

module.exports = mainController;