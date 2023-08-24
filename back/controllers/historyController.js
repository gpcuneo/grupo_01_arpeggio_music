const jsonTools = require('../utils/JSONTools');
let article = jsonTools.read('shoppingHistory.json');
const userTools = require('../utils/User')

const getHistory = (req, res) => {
    let userInfo = userTools.isLogged(req);
    res.render('shoppingHistory', { title:'Historial de compras', 'user':userInfo,article},);
}

const historyController = {
    index:getHistory,
}

module.exports=historyController;