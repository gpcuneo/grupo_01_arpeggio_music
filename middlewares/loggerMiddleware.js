const netTools = require('../utils/networkTools');

const loggerMiddleware = (req, res, next) => {
    let now = new Date();
    let log = {
        date: now.toLocaleString(),
        ip : netTools.getUserIP(req),
        path : req.path,
    }
    console.log(JSON.stringify(log));

    next();
};

module.exports = loggerMiddleware;