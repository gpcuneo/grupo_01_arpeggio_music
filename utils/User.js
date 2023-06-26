const isLogged = (req) => {
    if(req.session.user) {
        return req.session.user;
    } else {
        return false;
    }
}

const user = {
    isLogged: isLogged,
}

module.exports = user;