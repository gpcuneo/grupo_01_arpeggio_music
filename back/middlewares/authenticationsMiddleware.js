const db = require('../database/models');
const authenticationMiddleware = async (req, res, next) => {
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

module.exports = authenticationMiddleware;