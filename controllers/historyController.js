const jsonTools = require('../utils/JSONTools');
let article = jsonTools.read('shoppingHistory.json');

const getHistory = (req, res) => {
    res.render('shoppingHistory', { title:'Historial de compras', article},);
}

const historyController = {
    index:getHistory,
}

module.exports=historyController;