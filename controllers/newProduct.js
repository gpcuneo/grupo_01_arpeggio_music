let getNewProduct = (req,res) => {
    res.render('newProduct')
    
}

const newproductController ={
Index :getNewProduct,

}
module.exports = newproductController



