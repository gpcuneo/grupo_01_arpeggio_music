const db = require('../database/models');

const getUserID = async (userName) => {
    const userID = await db.User.findOne({
        where: { userName: userName },
        attributes: ['id']
    });

    return userID;
}

const getCart = async (req, res) => {
    const user = await getUserID(req.cookies.userName);
    console.log(user.id);
    
    const products = await db.Cart.findAll({
        where: { userid: user.id },
        attributes: ['id', 'productid', 'quantity']
    });
    delete(products.userid);
    return res.json(products);
}

const addItem = (req, res) => {
    const userID = getUserID(req.cookies.userName);
    db.Cart.create({
        userid: userID,
        productid: parseInt(req.body.product),
        quantity: 1
    });
}

const apiCart = {
    getCart: getCart,
    addItem: addItem,
}

module.exports = apiCart;