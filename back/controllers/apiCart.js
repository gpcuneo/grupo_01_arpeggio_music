const db = require('../database/models');

const getUserID = async (userName) => {
    const userID = await db.User.findOne({
        where: { userName: userName },
        attributes: ['id']
    });
    return userID.id;
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
        where: { userid: user },
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

const addItem = async (req, res) => {
    const userID = await getUserID(req.cookies.userName);
    result = await db.Cart.findOne({
        where: {
            userid: userID,
            productid: req.body.productid
        }
    });
    console.log(result)
    if(result) {
        const newQuantity = result.quantity + 1;
        try{
            result = await db.Cart.update(
                { quantity: newQuantity }, {
                where: {
                    userid: userID,
                    productid: req.body.productid
                }
            });
            console.log(`Se actualizo el registro a la cantidad: ${result.quantity} producto(s).`);
            return res.json({result: 'ok'})
        } catch (e) {
            console.error('Error al actualizar el carrito:', e);
            return res.json({error: error})
        }
    } else {
        try{
            result = await db.Cart.create({
                userid: userID,
                productid: parseInt(req.body.productid),
                quantity: parseInt(req.body.quantity),
            });
            console.log(`Se insertaron el registro ${result.id}`);
            return res.json({result: 'ok'})
        } catch (e) {
            console.error('Error al actualizar el carrito:', e);
            return res.json({error: error})
        }
    }
}

const updateItemQuantity = (req, res) => {
    const userID = getUserID(req.cookies.userName);
    const productID = req.body.productid;
    const newQuantity = req.body.newQuantity;
    db.Cart.update(
        { quantity: newQuantity }, {
        where: {
            userid: userID,
            productid: productID
        }
    })
    .then((result) => {
        console.log(`Se actualizó ${result[0]} producto(s).`);
        return res.json({update: 'OK'})
    }).catch((error) => {
        console.error('Error al actualizar el carrito:', error);
    });
}

const deleteItem = async (req, res) => {
    const userID = await getUserID(req.cookies.userName);
    const productID = req.body.productid;
    try{
        result = await db.Cart.destroy({
            where: {
                userid: userID,
                productid: productID
            }
        });
        console.log(`Se eliminaron ${result[0]} producto(s).`);
        return res.JSON({delete: 'OK'})
    } catch (e) {
        const error = await e;
        console.error('Error al actualizar el carrito:', error);
        return res.json({error: error})
    }
}

const apiCart = {
    getCart: getCart,
    addItem: addItem,
    updateItemQuantity: updateItemQuantity,
    deleteItem: deleteItem,
}

module.exports = apiCart;