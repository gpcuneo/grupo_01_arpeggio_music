let getEditproduct = (req, res) => {
    res.render('editproduct')
}

const editproductController = {
    index: getEditproduct
}

module.exports = editproductController;