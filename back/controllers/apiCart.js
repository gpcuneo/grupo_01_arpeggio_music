const db = require('../database/models');
const Cart = require('../models/cart');

const getUserID = async (userName) => {
    const userID = await db.User.findOne({
        where: { userName: userName },
        attributes: ['id']
    });
    return userID.id;
}
 
const getUserCart = async (req, res) => {
    const user = await getUserID(req.cookies.userName);
    const userCart = await Cart.getCart(user)
    return res.json(userCart);
}

const addItem = async (req, res) => {
    const userID = await getUserID(req.cookies.userName);
    const productId = parseInt(req.body.productid);
    const quantity = parseInt(req.body.quantity);
    
    const productStock = await db.Product.findOne({
        where: {id: productId},
        attributes: ['stock']
    });
    if(quantity > productStock.stock) {
        return res.json({error: 'stock insuficiente'})
    }
    
    const productCart = await Cart.findProductByUser(productId, userID);
    if(productCart) {
        const newQuantity = productCart.quantity + quantity;
        console.log('newQuantity')
        console.log(newQuantity)
        if(newQuantity > productStock.stock) {
            return res.json({error: 'stock insuficiente'})
        }
        await Cart.updateProductQuantity(productId, userID, newQuantity);
        return res.json({result: 'ok'})
    } else {
        console.log(' --- Agregando nuevo producto')
        await Cart.createProduct(productId, userID, quantity)
        return res.json({result: 'ok'})
    }
}

const updateItemQuantity = async (req, res) => {
    const userID = await getUserID(req.cookies.userName);
    const productId = parseInt(req.body.productid);
    const newQuantity =  parseInt(req.body.newQuantity);
    await Cart.updateProductQuantity(productId, userID, newQuantity);
    return res.json({update: 'OK'});
}

const deleteItem = async (req, res) => {
    const userID = await getUserID(req.cookies.userName);
    const productID = req.body.productid;
    Cart.removeProduct(productID, userID);
    return res.json({delete: 'OK'});
}

const apiCart = {
    getCart: getUserCart,
    addItem: addItem,
    updateItemQuantity: updateItemQuantity,
    deleteItem: deleteItem,
}

module.exports = apiCart;