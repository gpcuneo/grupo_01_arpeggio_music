const bcrypt = require('bcryptjs');
const jsonTools = require('../utils/JSONTools')
const netTools = require('../utils/networkTools')

let userList = jsonTools.read('users.json');
let orderHistory = jsonTools.read('horderHistory.json');

const getDateTimeNow = () => {
    let now = new Date();
    return now.toLocaleString('en-GB', { timeZone: 'UTC' });
}

const createUserObject = (req) => {
    return {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        emailValidated: req.body.emailValidated,
        address: req.body.address,
        city: req.body.city,
        dni: parseInt(req.body.dni),
        phone: parseInt(req.body.phone),
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        active: true,
        lastIP : netTools.getUserIP(req),
        rol: 'user'
    }
}

const comparePassword = (user) => {
    let result = user.password === user.confirmPassword ? true : false;
    return result;
}

const validateUserFields = (user, users) => {
    errors = {};
    users.find( ({dni}) => dni === user.dni) ? errors.dni = 'dni-error' : '' ;
    users.find( ({userName}) => userName === user.userName) ? errors.userName = 'userName-error' : '' ;
    users.find( ({email}) => email === user.email) ? errors.email = 'email-error' : '' ;
    comparePassword(user) ? '' : errors.password = 'password-error';
    return errors 
}

const showUser = (req, res) => {
    const id = parseInt(req.params.id)
    let userInfo = {}
    userList.forEach( user => user['id'] === id ? userInfo = user : '');
    res.render('User/profile', {'user': userInfo, 'orderHistory': orderHistory} );
}

const listUsers = (req, res) => {
    res.render('User/list', {'users': userList} );
}

const registerUser = (req, res) => {
    res.render('User/register', {'user': false, 'errors': false, 'action': 'register'});
}

const createUser = (req, res) => {
    let user = createUserObject(req);
    let users = jsonTools.read('users.json');

    // Se crea un objeto de errores con la finalidad de poblarlo con aquellos datos que 
    // ya se encuentren registrados por otro usuario y poder notificarle al usuario enviandolo a la vista.
    errors = validateUserFields(user, users);
    if (Object.keys(errors) != 0) {
        console.log('hay errores', errors);
        res.render('User/register', {'user': user, 'errors': errors, 'action': 'register'});
    } else {
        lastID = users[users.length -1]['id'];
        user.id = lastID + 1;
        user.timeCreate = getDateTimeNow();
        user.timeUpdate = getDateTimeNow();
        user.image = 'default.avif';
        user.password = bcrypt.hashSync(user.password, 10);
        delete(user.confirmPassword);
        users.push(user);
        jsonTools.write('users.json', users);
        console.log('Usuario guardado');
        res.redirect ('/user/' + user.id);
    }
}

const editUser = (req, res) => {
    let users = jsonTools.read('users.json');
    let userID = parseInt(req.params.id);
    let user = users.filter( ({id}) => { return id === userID });
    delete(user[0]['password'])
    delete(user[0]['confirmPassword'])
    res.render('User/register', {'user': user[0], 'errors': false, 'action': 'update'});
}

const updateUser = (req, res) => {
    let user = createUserObject(req);
    user.id = parseInt(req.params.id);
    user.timeUpdate = getDateTimeNow();
    
    let users = jsonTools.read('users.json');
    // Este filtro negativo se aplica para tener un arreglo que no contenga al usuario actual
    // y asi poder validar los campos dni, userName y email con los del resto de los usuarios.
    let temp_users_validate = users.filter( ({id}) => { return id != user.id });

    // Se crea un objeto de errores con la finalidad de poblarlo con aquellos datos que 
    // ya se encuentren registrados por otro usuario y poder notificarle al usuario enviandolo a la vista.
    errors = validateUserFields(user, temp_users_validate);
    if (Object.keys(errors) != 0) {
        console.log('hay errores', errors);
        res.render('User/register', {'user': user, 'errors': errors, 'action': 'update'});
    } else {
        user_index = users.findIndex( ({id}) => id === user.id );
        user.password = users[user_index]['password'];
        user.image = users[user_index]['image'];
        user.rol = users[user_index]['rol'];
        delete(user.confirmPassword);
        users[user_index] = user;
        jsonTools.write('users.json', users);
        console.log('Usuario actualizado');
        res.redirect ('/user/' + user.id);
    }
}

const updatePassword = (req, res) => {
    userID = parseInt(req.params.id);
    let users = jsonTools.read('users.json');
    if(req.body.password === req.body.confirmPassword) {
        userIndex = users.findIndex( ({id}) => id === userID );
        user = users[userIndex];
            if(req.body.Oldassword === user.password) {
                user.password = bcrypt.hashSync(req.body.password, 10);
                user.timeUpdate = getDateTimeNow();
                user.lastIP = netTools.getUserIP(req),
                console.log(user)
                users['userIndex'] = user;
                jsonTools.write('users.json', users);
                console.log('Usuario actualizado');
            } else {
                console.log('Error el clave anteriro')
            }
    }
    res.redirect ('/user/' + user.id);
}

const userDelete = (req, res) => {
    let users = jsonTools.read('users.json');
    let userID = parseInt(req.params.id);
    let user = users.filter( ({id}) => { return id === userID });
    res.render('User/delete', {'user': user[0]});
}

const userDisable = (req, res) => {
    let userID = parseInt(req.params.id);
    let users = jsonTools.read('users.json');
    let user_index = users.findIndex( ({id}) => { return id === userID });
    users[user_index].active = false;
    users[user_index].timeUpdate = getDateTimeNow();
    jsonTools.write('users.json', users);
    console.log('Se elimino el usuario: ' + userID);
    res.redirect('/');
}

const userEnable = (req, res) => {
    let userID = parseInt(req.params.id);
    let users = jsonTools.read('users.json');
    let user_index = users.findIndex( ({id}) => { return id === userID });
    users[user_index].active = true;
    users[user_index].timeUpdate = getDateTimeNow();
    jsonTools.write('users.json', users);
    console.log('Se habilito el usuario: ' + userID);
    res.redirect('/user');
}

const login = (req, res) => {
    res.render('User/login', {'user': false, 'error': false});
}

const userLogin = (req, res) => {
    //let user = createUserObject(req);
    let user = req.body;
    //console.log(user);
    let users = jsonTools.read('users.json');
    let userFound = users.filter( ({userName}) => { return userName === user.userName })[0];
    if(userFound.length != 0) {
        if(bcrypt.compareSync(user.password, userFound.password) && userFound.active){
            console.log('logged');
            if(!!req.body.remember) {
                res.cookie('userName', user.userName, {
                    maxAge: 1000 * 60 * 60 * 24 * 30
                });
            }
            delete userFound.id;
            delete userFound.password;
            req.session.user = userFound;
            res.redirect('/');
        } else {
            console.log('Error pwd');
            res.render('User/login', {'user': user, 'error': true});
        }
    } else {
        console.log('error de mail');
        res.render('User/login', {'user': user, 'error': true});
    }
}

const uploadImage = (req, res) => {
    let userid = parseInt(req.params.id);
    let users = jsonTools.read('users.json');
    let user_index = users.findIndex( ({id}) => id === userid );
    users[user_index]['image'] = req.file.filename;
    users[user_index]['timeUpdate'] = getDateTimeNow();
    jsonTools.write('users.json', users);
    console.log('Usuario actualizado');
    res.redirect ('/user/'+userid);
}

const exportUserlist = (req, res) => {
    const fileName = jsonTools.exportToCSV('users.json');
    const pathFile = './tmp/'+fileName;
    res.download(pathFile);
}

const userController = {
    show: listUsers,
    showByID: showUser,
    login: login,
    auth: userLogin,
    register: registerUser,
    create: createUser,
    edit: editUser,
    updateInfo: updateUser,
    updatePwd: updatePassword,
    updateImage: uploadImage,
    delete: userDelete,
    disable: userDisable,
    enable: userEnable,
    export: exportUserlist,
}

module.exports = userController;