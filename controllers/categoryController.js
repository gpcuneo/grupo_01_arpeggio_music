// category data
const categoryList = [
    {id: '1', instrument: 'Guitarra criolla'},
    {id: '2', instrument: 'Guitarra eléctrica'},
    {id: '3', instrument: 'Piano'},
    {id: '4', instrument: 'Batería'},
    {id: '5', instrument: 'Teclado'},
    {id: '6', instrument: 'Violín'},
    {id: '7', instrument: 'Saxofón'},
    {id: '8', instrument: 'Clarinete'},
]


let showCategory = (req, res) => {
    if(req.params.id){
        console.log(req.params.id);
    }
    let categoryList = {}
    categoryList.forEach( category['id'] === id ? categoryInfo = category : '');
    console.log(categoryInfo);
    res.render('category', {categoryInfo: categoryInfo})
}
const categoryUsers = (req, res) => {
    res.render('categoryList', {'category': categoryList} );
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