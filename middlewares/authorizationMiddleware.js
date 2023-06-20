const isAdmin = (req, res, next) => {
    if(req.session.user) {
        if(req.session.user.rol === 'admin') {
            next();
        }
    }
    res.redirect('/user/login');
}

const isOwnerOrAdmin = (req, res, next) => {
    if(req.session.user) {
        let reqUserName = req.params.userName;
        let userName = req.session.user.userName;
        let rol = req.session.user.rol;
        console.log(userName);
        console.log(req.userName);
        if(rol === 'admin' || userName == reqUserName) {
            next();
        } else {
            res.redirect('/user/' + userName);
        }
    }
    res.redirect('/user/login');
}

const authorizationMiddleware = {
    isAdmin: isAdmin,
    isOwnerOrAdmin: isOwnerOrAdmin,
}

module.exports = authorizationMiddleware;