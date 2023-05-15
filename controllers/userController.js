const path = require('path')

const showUser = (req, res) => {
    if(req.params.id) {
        console.log(req.params.id)
    }
    
    res.render('userProfile');
}

const userController = {
    index: showUser,
    // show: '',
    // create: '',
    // update: '',
    // delete: '',
}

module.exports = userController;