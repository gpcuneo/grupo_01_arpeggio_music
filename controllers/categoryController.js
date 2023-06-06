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
    postCategory: (req, res) => {
        let datos = req.body;
        datos.id = categoryList.length+1;
        categoryList.push(datos);
        res.redirect('/category')
    },
    getCategoryCreate: (req, res) => {
        res.render('categoryEdit')
    },
    getCategoryId: (req, res) => {
        const id = Number(req.params.id);
        const categoryById = categoryList.find(categoryActual => categoryActual.id === id);
        if(!categoryById) {
            return res.send('error de Id')
        };
        res.render('category', {title: 'categoryById', category:categoryById});
    },
    getCategoryUpdate: (req,res) => {
        const id = Number(req.params.id);
        const categoryUpDate = categoryList.find(categoryActual => categoryActual.id === id);
        if(!categoryUpDate) {
            return res.send('error de ID)')
        };
        res.render ('categoryEdit', {category: categoryUpDate})
    },
    getCategoryDelete: (req, res) => {
        const id = Number(req.params.id);
        const categoryDelete = categoryList.filter(categoryActual => categoryActual.id !== id);
        categoryList = categoryDelete;
        res.redirect('/category')
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