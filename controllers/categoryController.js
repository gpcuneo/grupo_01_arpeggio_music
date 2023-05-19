let showCategory = (req, res) => {
    res.render('category')
}

const productcatController = {
    show: showCategory,
    // showbyid: '',
    // create: '',
    // update: '',
    // delete: '',
}

module.exports = productcatController