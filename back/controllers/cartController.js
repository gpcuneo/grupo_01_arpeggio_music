const jsonTools= require('../utils/JSONTools');
let cart = jsonTools.read('cart.json');
const userTools = require('../utils/User')
require('dotenv').config();
const envs = process.env;

let urlBase = `http://${envs.APP_URL}:${envs.APP_PORT}/api/cart`;

let getCart = (req, res)=>{
    let userInfo = userTools.isLogged(req);
    const costShop={
        discount:25,
        costSend: 2500,
    }
    res.render('productCart', {title:'Mi carrito', cart, 'user':userInfo,costShop})
}
const getOrder=async (req,res)=>{
    try {
        let cartData= await getApiCart();
        console.log(cartData);
        let userInfo = userTools.isLogged(req);
        res.render('orderShop',{title:'Order', 'user':userInfo })
    } catch (error) {
        console.error('La api no se logror llamar');
        res.send('No se pudo llamar a la api')
    }
}
const getApiCart = async()=>{
    try {
        const response = await fetch(urlBase,{
            method:'GET',
            credentials:'include'
        });
        if(!response.ok){
            throw new Error('La respuesta de la api no llego')
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al llamar a la api');
        throw error;
    }
}
const cartController ={
    cart:getCart,
    order:getOrder
}

module.exports=cartController;