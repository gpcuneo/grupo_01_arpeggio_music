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

const categoryControllers = {
    getCategory: (req, res) => {
        res.render('category', {'categoryList': categoryList})
    },
    getCategoryId: (req, res) => {
        res.render('category')
    },
    getCategoryCreate: (req, res) => {
        res.render('categoryEdit', {action:'create'})
    },
    getCategoryUpdate: (req,res) => {
        res.render ('categoryEdit',{action:'update'})
    },
    getCategoryDelete: (req, res) => {
        res.render('category')
    },
}


/* const categoryController = {
    show:showCategories,
    showbyid:getCategoryId,
    create:getCategoryCreate,
    update:getCategoryUpdate,
    delete:getCategoryDelete,
} */

module.exports = categoryControllers;