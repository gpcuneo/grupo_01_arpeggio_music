const userLogged = (req) => {
    if(req.session.user) {
        console.log(req.session.user)
        return req.session.user;
    } else {
        console.log('FALSE!')
        return false;
    }
}


let getIndex = (req, res) => {
    let user = false;
    if(req.session.user) {
        console.log(req.session.user)
        user = req.session.user;
    } else {
        console.log('nono')
    }
    console.log(user)
    res.render('index', {'user': user})
}

const indexController = {
    Index: getIndex,
}


module.exports = indexController

