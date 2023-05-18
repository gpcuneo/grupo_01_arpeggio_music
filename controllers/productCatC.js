let getproductCat = (req, res) => {
    res.render('productCat')

}

const productcatController = {
    Index: getproductCat,
}


module.exports = productcatController


