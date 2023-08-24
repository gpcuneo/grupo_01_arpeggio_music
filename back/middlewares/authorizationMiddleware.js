const e = require("express");

const isAdmin = (req, res, next) => {
    //if(req.session.user && req.session.user.rol === 'admin') {
    if(req.session.user && req.session.user.id_rol === 2) {
        next();
    } else {
        res.redirect('/user/login');
    }
}

const isOwner = (req, res, next) => {
    if(req.session.user) {
        let reqUserName = req.params.userName;
        let userName = req.session.user.userName;
        if(userName == reqUserName) {
            next();
        } else {
            res.redirect('/user/' + userName);
        }
    }
    res.redirect('/user/login');
}

const isOwnerOrAdmin = (req, res, next) => {
    if(req.session.user) {
        let reqUserName = req.params.userName;
        let userName = req.session.user.userName;
        let rol = req.session.user.id_rol;
        //if(rol === 'admin' || userName == reqUserName) {
        if(rol === 2 || userName == reqUserName) {
            next();
        } else {
            res.redirect('/user/' + userName);
        }
    } else {
        res.redirect('/user/login');
    }
}

const authorizationMiddleware = {
    isAdmin: isAdmin,
    isOwnerOrAdmin: isOwnerOrAdmin,
    isOwner:isOwner,
}

module.exports = authorizationMiddleware;