const userTools = require('../utils/User');

let getAdminHome = (req, res)=>{
    const user = userTools.isLogged(req);
    res.render('admin', {user});
}

const adminController ={
    home:getAdminHome,
}

module.exports=adminController;