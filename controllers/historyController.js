const readJson = require('../utils/readJSON');
let article = readJson('shoppingHistory.json');

const getHistory = (req, res) => {
    res.render('shoppingHistory', { title:'Historial de compras', article},);
}

const historyController = {
    index:getHistory,
}

module.exports=historyController;