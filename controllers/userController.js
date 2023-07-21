const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jsonTools = require('../utils/JSONTools');
const netTools = require('../utils/networkTools');
const userTools = require('../utils/User');
const db = require('../database/models');
const {validationResult} = require('express-validator');

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

const validateUserFields = (user, users, req) => {
    const errors = validationResult(req).mapped();
    console.log(errors)
    users.find( ({dni}) => dni === user.dni) ? errors.dni = {msg : 'El DNI ya se encuentra registrado'} : '' ;
    users.find( ({userName}) => userName === user.userName) ? errors.userName = {msg : 'El nombre de usuario ya fue usado'} : '' ;
    users.find( ({email}) => email === user.email) ? errors.email = {msg : 'El email ya se encuentra registrado'} : '' ;
    comparePassword(user) ? '' : errors.password = {msg :'Las contrasenas no coinciden'};
    console.log(errors)
    return errors 
}

const showUser = (req, res) => {
    const userName = req.params.userName;
    console.log(userName);
    let userInfo = {}
    console.log(userInfo)
    userList.forEach( user => user.userName === userName ? userInfo = user : '');
    res.render('User/profile', {'user': userInfo, 'orderHistory': orderHistory} );
}

const listUsers = (req, res) => {
    let userInfo = userTools.isLogged(req);
        db.User.findAll().then(
            (usersData) => res.render('User/list', {'users': usersData, user: userInfo}
        )
    );
}

const registerUser = (req, res) => {
    if(userTools.isLogged(req)) {
        res.redirect('/')
    } else {
        res.render('User/register', {'user': false, 'errors': false, 'action': 'register'});
    }
}

const createUser = (req, res) => {
    let user = createUserObject(req);
    let users = jsonTools.read('users.json');
    // Se crea un objeto de errores con la finalidad de poblarlo con aquellos datos que 
    // ya se encuentren registrados por otro usuario y poder notificarle al usuario enviandolo a la vista.
    errors = validateUserFields(user, users, req);
    if (Object.keys(errors) != 0) {
        console.log('hay errores', errors);
        res.render('User/register', {'user': user, 'errors': errors, 'action': 'register'});
    } else {
        user.id = uuid.v4();
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
    let userSearch = req.params.userName;
    console.log('userSearch')
    console.log(userSearch)
    console.log(users)
    let user = users.filter( ({userName}) => { return userName == userSearch });
    console.log('user')
    console.log(user)
    delete(user[0]['password'])
    delete(user[0]['confirmPassword'])
    res.render('User/register', {'user': user[0], 'errors': false, 'action': 'update'});
}

const updateUser = (req, res) => {
    let user = createUserObject(req);
    userSearch = req.params.userName;
    user.timeUpdate = getDateTimeNow();
    
    let users = jsonTools.read('users.json');
    // Este filtro negativo se aplica para tener un arreglo que no contenga al usuario actual
    // y asi poder validar los campos dni, userName y email con los del resto de los usuarios.
    let temp_users_validate = users.filter( ({userName}) => { return userName != userSearch });

    // Se crea un objeto de errores con la finalidad de poblarlo con aquellos datos que 
    // ya se encuentren registrados por otro usuario y poder notificarle al usuario enviandolo a la vista.
    errors = validateUserFields(user, temp_users_validate. req);
    if (Object.keys(errors) != 0) {
        console.log('hay errores', errors);
        res.render('User/register', {'user': user, 'errors': errors, 'action': 'update'});
    } else {
        user_index = users.findIndex( ({userName}) => userName === userSearch );
        user.password = users[user_index]['password'];
        user.image = users[user_index]['image'];
        user.rol = users[user_index]['rol'];
        delete(user.confirmPassword);
        users[user_index] = user;
        jsonTools.write('users.json', users);
        console.log('Usuario actualizado');
        res.redirect ('/user/' + userSearch);
    }
}

const updatePassword = (req, res) => {
    userSearch = req.params.userName;
    let users = jsonTools.read('users.json');
    if(req.body.password === req.body.confirmPassword) {
        userIndex = users.findIndex( ({userName}) => userName === userSearch );
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
    res.redirect ('/user/' + userSearch);
}

const userDelete = (req, res) => {
    let users = jsonTools.read('users.json');
    let userSearch = req.params.arrUserName;
    let user = users.filter( ({userName}) => { return userName === userSearch });
    res.render('User/delete', {'user': user[0]});
}

const userDisable = (req, res) => {
    let userSearch = req.params.userName;
    let users = jsonTools.read('users.json');
    let user_index = users.findIndex( ({userName}) => { return userName === userSearch });
    users[user_index].active = false;
    users[user_index].timeUpdate = getDateTimeNow();
    jsonTools.write('users.json', users);
    console.log('Se elimino el usuario: ' + userSearch);
    res.redirect('/');
}

const userEnable = (req, res) => {
    let userSearch = req.params.arrUserName;
    let users = jsonTools.read('users.json');
    let user_index = users.findIndex( ({userName}) => { return userName === userSearch });
    users[user_index].active = true;
    users[user_index].timeUpdate = getDateTimeNow();
    jsonTools.write('users.json', users);
    console.log('Se habilito el usuario: ' + userSearch);
    res.redirect('/user');
}

const login = (req, res) => {
    if(userTools.isLogged(req)) {
        res.redirect('/');    
    } else {
        res.render('User/login', {'user': false, 'error': false});
    }
}

const userLogin = (req, res) => {
    let user = req.body;
    let users = jsonTools.read('users.json');
    let userFound = users.filter( ({userName}) => { return userName === user.userName })[0];
    if(userFound) {
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
        console.log('userName error');
        res.render('User/login', {'user': user, 'error': true});
    }
}

const signOut = (req, res) => {
    res.clearCookie('userName');
    delete req.session.user;
    res.redirect('/');
}

const uploadImage = (req, res) => {
    let userSearch = req.params.userName;
    let users = jsonTools.read('users.json');
    let user_index = users.findIndex( ({userName}) => userName === userSearch );
    users[user_index]['image'] = req.file.filename;
    users[user_index]['timeUpdate'] = getDateTimeNow();
    jsonTools.write('users.json', users);
    console.log('Usuario actualizado');
    res.redirect ('/user/'+userSearch);
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
    logout: signOut,
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