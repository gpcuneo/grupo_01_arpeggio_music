let showCategory = (req, res) => {
    res.render('category')
}
let getCategoryId = (req, res) => {
    res.render('category')
}
let getCategoryCreate = (req, res) => {
    res.render('category', {action:'create'})
}
let getCategoryUpDate = (req, res) => {
    res.render('category', {action:'update'})
}
let getCategoryDelete = (req, res) => {
    res.render('category')
}

const categoryController = {
    show:showCategory,
    showbyid:getCategoryId,
    create:getCategoryCreate,
    update:getCategoryUpDate,
    delete:getCategoryDelete,
}

module.exports = categoryController