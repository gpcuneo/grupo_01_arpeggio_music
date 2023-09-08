const db = require('../database/models');

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
    let userCart ={}
    userCart.products = formatObjectProduct(products);
    userCart.totalPrice = sumTotalPriceProducts(userCart.products);
    return userCart;
}

const cart = {
    getCart: getCart,
}

module.exports = cart;