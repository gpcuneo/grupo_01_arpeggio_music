const jsonTools= require('../utils/JSONTools');
let cart = jsonTools.read('cart.json');
const userTools = require('../utils/User')

let getCart = (req, res)=>{
    let userInfo = userTools.isLogged(req);
    const costShop={
        discount:25,
        costSend: 2500,
    }
    res.render('productCart', {title:'Mi carrito', cart, 'user':userInfo,costShop})
}

const cartController ={
    cart:getCart,
}

module.exports=cartController;