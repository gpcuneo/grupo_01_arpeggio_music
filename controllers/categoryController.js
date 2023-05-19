let showCategory = (req, res) => {
    res.render('category')
}

const categoryController = {
    show: showCategory,
    // showbyid: '',
    // create: '',
    // update: '',
    // delete: '',
}

module.exports = categoryController