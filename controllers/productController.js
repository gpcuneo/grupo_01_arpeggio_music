let getProduct = (req, res)=>{
    if(req.params.id){
        console.log(req.params.id)
    }
    res.render('productDetail')
}

const productController={
    Index:getProduct,
}


module.exports=productController;