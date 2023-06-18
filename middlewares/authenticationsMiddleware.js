const jsonTools = require('../utils/JSONTools')
const authenticationMiddleware = (req, res, next) => {
    if(req.cookies.userName) {
        let users = jsonTools.read('users.json');
        let user = users.filter( ({userName}) => { return userName === req.cookies.userName });
        if(user.length == 1) {
            user = user[0];
            delete user.id;
            delete user.password;
            req.session.user = user;
        }
    }
    
    next();
}

module.exports = authenticationMiddleware;