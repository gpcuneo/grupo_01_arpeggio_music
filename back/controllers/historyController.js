const jsonTools = require('../utils/JSONTools');
//let article = jsonTools.read('shoppingHistory.json');
const Order = require('../models/order')
const userTools = require('../utils/User')

const formatDate = (orderHistory) => {
    const formatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    };

    for(let i=0; i<orderHistory.length; i++) {
        const originalDate = new Date(orderHistory[i].createdAt);
        const strDate = originalDate.toLocaleString("es-AR", formatOptions);
        orderHistory[i].date = strDate
    }
    return orderHistory;
}

const getHistory = async (req, res) => {
    const userInfo = userTools.isLogged(req);
    const orderId = req.params.id;

    if( await Order.checkIfOwner(orderId, userInfo.id)) {
        const sales = await Order.getAssociatedSales(req.params.id, userInfo.id);
        const newDate = formatDate(sales)
        const articles = sales.map ( item => {
            return (
                { ...item ,
                    image: JSON.parse(item['product.image']).map(image => `/images/productos/${image}`),
                }
                )
            })
        console.log(articles);
        return res.render('shoppingHistory', { title:'Historial de compras', 'user':userInfo, articles},);
    } else {
        return res.redirect('/')
    }
    
}

const historyController = {
    index:getHistory,
}

module.exports=historyController;