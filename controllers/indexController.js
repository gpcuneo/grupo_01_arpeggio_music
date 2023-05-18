let getIndex = (req, res) => {
    res.render('index')

}

const indexController = {
    Index: getIndex,
}


module.exports = indexController

