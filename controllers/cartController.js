const jsonTools= require('../utils/JSONTools');
let cart = jsonTools.read('cart.json');


let getCart = (req, res)=>{
    const costShop={
        discount:25,
        costSend: 2500,
    }
    res.render('productCart', {title:'Mi carrito', cart, costShop})
}

const cartController ={
    cart:getCart,
}

module.exports=cartController;