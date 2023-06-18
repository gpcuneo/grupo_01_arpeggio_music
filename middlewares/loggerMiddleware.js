const netTools = require('../utils/networkTools')

const loggerMiddleware = (req, res, next) => {
    let ip = netTools.getUserIP(req);
    let path = req.path;
    console.log(` - log: ${path} : ${ip}`);

    next();
};

module.exports = loggerMiddleware;