const authorizationMiddleware = (req, res, next) => {
    if(req.session.user) {
        if(req.session.user.rol === 'admin') {
            next();
        }
    }
    res.redirect('/user/login');
}

module.exports = authorizationMiddleware;