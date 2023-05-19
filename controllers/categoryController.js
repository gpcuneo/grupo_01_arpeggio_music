let showCategory = (req, res) => {
    res.render('category')
}

const productcatController = {
    show: showCategory,
}

module.exports = productcatController