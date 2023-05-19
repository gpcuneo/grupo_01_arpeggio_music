const getHistory = (req, res) => {
    res.render('shoppingHistory');
}

const historyController = {
    index:getHistory,
}

module.exports=historyController;