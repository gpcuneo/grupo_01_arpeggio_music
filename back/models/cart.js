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

const findProductByUser = async (productId, userId) => {
    try {
        const result = await db.Cart.findOne({
            where: {
                userid: userId,
                productid: productId
            }
        });
        if(result) {
            return result;
        } else {
            return null;
        }
    } catch (error) {
        console.log(`Error al consultar el producto en el carrito del usuario: ${error}`);
    }
}

const updateProductQuantity = async (productId, userId, newQuantity) => {
    try {
        await db.Cart.update(
            { quantity: newQuantity }, {
                where: {
                userid: userId,
                productid: productId
            }
        });
    } catch (error) {
        console.log(`Error al consultar el producto en el carrito del usuario: ${error}`);
    }
}

const createProduct = async (productId, userId, quantity) => {
    try {
        await db.Cart.create({
            userid: userId,
            productid: productId,
            quantity: quantity,
        });
    } catch (error) {
        console.log(`Error al consultar el producto en el carrito del usuario: ${error}`);
    }
}

const removeProduct = async (productId, userId) => {
    try{
        result = await db.Cart.destroy({
            where: {
                userid: userId,
                productid: productId
            }
        });
        //return res.json({delete: 'OK'})
    } catch (e) {
        const error = await e;
        console.error('Error al actualizar el carrito:', error);
        //return res.json({error: error})
    }
}

const cart = {
    getCart: getCart,
    findProductByUser: findProductByUser,
    updateProductQuantity: updateProductQuantity,
    createProduct: createProduct,
    removeProduct: removeProduct,
}

module.exports = cart;