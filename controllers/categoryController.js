// category data
const categoryList = [
    {id: '1', name: 'Guitarra criolla'},
    {id: '3', name: 'Piano'},
    {id: '4', name: 'Batería'},
    {id: '5', name: 'Teclado'},
    {id: '2', name: 'Guitarra eléctrica'},
    {id: '6', name: 'Violín'},
    {id: '7', name: 'Saxofón'},
    {id: '8', name: 'Clarinete'},
]


let showCategories = (req, res) => {
    res.render('category', {'categoryList': categoryList})
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
    show:showCategories,
    showbyid:getCategoryId,
    create:getCategoryCreate,
    update:getCategoryUpDate,
    delete:getCategoryDelete,
}

module.exports = categoryController