const db = require('../database/models');

const getUserID = async (userName) => {
    const userID = await db.User.findOne({
        where: { userName: userName },
        attributes: ['id']
    });
    return userID;
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
    console.log(itemsArray)
    return itemsArray.reduce( (accumulated, currentValue) => {
        console.log(currentValue.totalPriceProduct)
        return accumulated + currentValue.totalPriceProduct
    }, 0);
}

const getCart = async (req, res) => {
    const user = await getUserID(req.cookies.userName);
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
    return res.json(cart);
}

const addItem = (req, res) => {
    const userID = getUserID(req.cookies.userName);
    db.Cart.create({
        userid: userID,
        productid: parseInt(req.body.product),
        quantity: parseInt(req.body.quantity),
    });
}

const apiCart = {
    getCart: getCart,
    addItem: addItem,
}

module.exports = apiCart;