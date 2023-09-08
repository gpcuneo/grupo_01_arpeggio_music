const jsonTools = require('../utils/JSONTools');
//let article = jsonTools.read('shoppingHistory.json');
const Order = require('../models/order')
const userTools = require('../utils/User')

const getHistory = async (req, res) => {
    const userInfo = userTools.isLogged(req);
    const orderId = req.params.id;

    if( await Order.checkIfOwner(orderId, userInfo.id)) {
        const sales = await Order.getAssociatedSales(req.params.id, userInfo.id);
        const articles = sales.map ( item => {
            return (
                { ...item ,
                    image: JSON.parse(item['product.image']).map(image => `/images/productos/${image}`),
                }
            )
        })
        console.log('articles');
        console.log(articles[0]);
        return res.render('shoppingHistory', { title:'Historial de compras', 'user':userInfo, articles},);
    } else {
        return res.redirect('/')
    }
    
}

const historyController = {
    index:getHistory,
}

module.exports=historyController;