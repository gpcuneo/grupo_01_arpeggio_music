const e = require('express');
const db = require('../database/models');
const authMiddleware = async (req, res, next) => {
    if(req.cookies.userName) {
        const user = await db.User.findOne({ 
            where: { userName: req.cookies.userName },
        });
        if(user) {
            delete user.id;
            delete user.password;
            req.session.user = user;
        }
    }
    next();
}

const apiAuthMiddleware = async (req, res, next) => {
    if(req.cookies.userName) {
        const user = await db.User.findOne({ 
            where: { userName: req.cookies.userName },
        });
        if(user) {
            delete user.id;
            delete user.password;
            req.session.user = user;
        } else {
            return res.send('404');
        } 
    } else {
        return res.send('404');
    }
    next();
}

const authenticationMiddleware = {
    auth: authMiddleware,
    apiAuth: apiAuthMiddleware,
}

module.exports = authenticationMiddleware;