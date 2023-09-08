const e = require('express');
const db = require('../database/models');
const { getCart } = require('../models/cart');
const authMiddleware = async (req, res, next) => {
    if(req.cookies.userName) {
        const user = await db.User.findOne({ 
            where: { userName: req.cookies.userName },
            include: [
                {association: 'Town', as: 'town'},
                {association: 'Province', as: 'province'},
                ]
        });
        if(user) {
            user.cart = await getCart(user.id);
            delete user.dataValues.id;
            delete user.dataValues.password;
            console.log(' --- user')
            console.log(user)
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
            return res.redirect('/user/login');
        } 
    } else {
        return res.redirect('/user/login');
    }
    next();
}

const authenticationMiddleware = {
    auth: authMiddleware,
    apiAuth: apiAuthMiddleware,
}

module.exports = authenticationMiddleware;