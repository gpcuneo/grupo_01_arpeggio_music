const userTools = require('../utils/User')
const db = require('../database/models');
const { fn, or } = require('sequelize');
const user = require('../utils/User');

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

const getCart = async (userid) => {
    const products = await db.Cart.findAll({
        where: { userid: userid },
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
    return cart;
}

const getOrder = async (userID) => {
    try {
        const result = await db.Order.findOne({
            where: {
                user_id: userID
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        return result;
    } catch (error) {
        console.error('Error al obtener el último preference_id:', error);
        throw error;
    }
}

const impactSales = async (products, order_id) => {
    const rows = products.map( product => {
        return {
            order_id: order_id,
            product_id: product.id,
            price: product.price,
            quantity: product.quantity,
        }
    });
    try {
        await db.Sale.bulkCreate(rows);
    } catch (error) {
        console.error('Error al guardar las ventas:', error);
        throw error;
    }
    
}

const updateProductsStock = async (products) => {
    products.map( async product => {
        const stock = await db.Product.findOne({
                                    where: {id: product.id},
                                    attributes: ['stock']
                            });
        await db.Product.update(
            {stock: stock - product.quantity},
            {where: { id: product.id}}
        );
    });
}

const createInvoice = async (orderID, totalPrice, paymentType) => {
    const invoiceID = await db.Invoice.create({
        order_id: orderID,
        total: totalPrice,
        payment_type: paymentType
    });
    return invoiceID.id;
}

const clearCar = async (userID) => {
    await db.Cart.destroy({
        where: {userid: userID}
    });
}

const createDelivery = (orderID) => {
    db.Shipping.create({
        status: 'En preparacion',
        order_id: orderID,
    });
}

const paymentResult = async (req, res) => {
    const user = userTools.isLogged(req);
    const payment = {
		id: req.query.payment_id,
		status: req.query.status,
        collectionID: req.query.collection_id,
		merchantOrder: req.query.merchant_order_id,
        type: req.query.payment_type,
        preference_id: req.query.preference_id
	};
    if(payment.status === 'approved') {
        const userID = await getUserID(req.cookies.userName);
        const productsCar = await getCart(userID);
        const order = await getOrder(userID);
        if(payment.preference_id === order.preference_id ) {
            await impactSales(productsCar.products, order.id);
            const invoice = await createInvoice(order.id, productsCar.totalPrice, payment.type);
            await updateProductsStock(productsCar.products);
            await createDelivery(order.id);
            await clearCar(userID);
            return res.render('payment', {order, invoice, user});
        } else {
            return res.render('payment', {order, invoice:null, user});
        }
    } else {
        console.error(' --- PAGO FALLIDO -- ')
    }
}


const mainController = {
    home: home,
    store: store,
    about: about,
    shipping: shipping,
    error: error,
    storePOST: storePOST,
    checkout: checkout,
    paymentResult: paymentResult
}

module.exports = mainController;



// http://localhost||192.168.0.120/
// ?collection_id=1314621752
// &collection_status=approved
// &payment_id=1314621752
// &status=approved
// &external_reference=null
// &payment_type=credit_card
// &merchant_order_id=11530151897
// &preference_id=56415458-527fd2e1-bfb4-4e4a-8899-6b5fcea58bce
// &site_id=MLA
// &processing_mode=aggregator
// &merchant_account_id=null