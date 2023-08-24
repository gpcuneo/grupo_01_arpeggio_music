const getIPConnection = (req) => {
    const ipFull = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const arrIP = ipFull.split(":");
    const arrExtension = arrIP.length;
    return arrIP[arrExtension -1];
}

const netTools = {
    'getUserIP': getIPConnection,
}

module.exports = netTools;
