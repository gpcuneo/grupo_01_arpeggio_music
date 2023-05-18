let getCompra = (req, res) => {
    res.render('compra')

}

const compraController = {
    Index: getCompra,
}


module.exports = compraController


