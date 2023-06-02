// dummy data
const jsonTools = require('../utils/JSONTools')

let userList = jsonTools.read('users.json');
let orderHistory = jsonTools.read('horderHistory.json');

const showUser = (req, res) => {
    console.log('show user')
    if(req.params.id) { // Si en la peticion viene el parametro id lo imprimimos por consola
        console.log(req.params.id)
    }
    const id = parseInt(req.params.id)
    let userInfo = {}
    userList.forEach( user => user['id'] === id ? userInfo = user : '');
    res.render('userProfile', {'userInfo': userInfo, 'orderHistory': orderHistory} );
}

const listUsers = (req, res) => {
    console.log('list users')
    res.render('userList', {'users': userList} );
}

const registerUser = (req, res) => {
    console.log('user register')
    res.render('userRegister', {'user': false, 'errors': false, 'action': 'register'});
}

const createUser = (req, res) => {
    console.log('create user')
    // Create user object
    let user = {
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
    }
    
    // load data from json file
    let users = jsonTools.read('users.json');

    // validate user not exist in user list from dni and email.
    errors = {};
    users.find( ({dni}) => dni === user.dni) ? errors.dni = 'dni-error' : '' ;
    users.find( ({userName}) => userName === user.userName) ? errors.userName = 'userName-error' : '' ;
    users.find( ({email}) => email === user.email) ? errors.email = 'email-error' : '' ;
    if (Object.keys(errors) != 0) {
        console.log('hay errores', errors);
        res.render('userRegister', {'user': user, 'errors': errors, 'action': 'register'});
    } else {
        lastID = users[users.length -1]['id'];
        user.id = lastID + 1;
        users.push(user);
        jsonTools.write('users.json', users);
        console.log('Usuario guardado');
        res.redirect ('/');
    }
}

const editUser = (req, res) => {
    console.log('edit user')
    let users = jsonTools.read('users.json');
    let userID = parseInt(req.params.id);
    let user = users.filter( ({id}) => { return id === userID });
    res.render('userRegister', {'user': user[0], 'errors': false, 'action': 'update'});
}

const updateUser = (req, res) => {
    console.log('update user')
    let user = {
        id: parseInt(req.params.id),
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
    }
    
    let users = jsonTools.read('users.json');
    let temp_users_validate = users.filter( ({id}) => { return id != user.id });
    console.log(temp_users_validate)

    errors = {};
    temp_users_validate.find( ({dni}) => dni === user.dni) ? errors.dni = 'dni-error' : '' ;
    temp_users_validate.find( ({userName}) => userName === user.userName) ? errors.userName = 'userName-error' : '' ;
    temp_users_validate.find( ({email}) => email === user.email) ? errors.email = 'email-error' : '' ;

    if (Object.keys(errors) != 0) {
        console.log('hay errores', errors);
        res.render('userRegister', {'user': user, 'errors': errors, 'action': 'update'});
    } else {
        user_index = users.findIndex( ({id}) => id === user.id );
        users[user_index] = user;
        jsonTools.write('users.json', users);
        console.log('Usuario actualizado');
        res.redirect ('/');
    }
}

const login = (req, res) => {
    res.render('userLogin');
}

// Declaramos el objeto userController el cual tendra metodos que invocaran a funciones
const userController = {
    show: listUsers,
    showByID: showUser,
    login: login,
    register: registerUser,
    create: createUser,
    edit: editUser,
    update: updateUser,
    // delete: '',
}

// exportamos el modulo.
module.exports = userController;