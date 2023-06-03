// dummy data
const jsonTools = require('../utils/JSONTools')

let userList = jsonTools.read('users.json');
let orderHistory = jsonTools.read('horderHistory.json');

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
    }
}

const validateUserFields = (user, users) => {
    errors = {};
    users.find( ({dni}) => dni === user.dni) ? errors.dni = 'dni-error' : '' ;
    users.find( ({userName}) => userName === user.userName) ? errors.userName = 'userName-error' : '' ;
    users.find( ({email}) => email === user.email) ? errors.email = 'email-error' : '' ;
    return errors
}

const showUser = (req, res) => {
    console.log('show user')
    const id = parseInt(req.params.id)
    let userInfo = {}
    userList.forEach( user => user['id'] === id ? userInfo = user : '');
    res.render('User/profile', {'userInfo': userInfo, 'orderHistory': orderHistory} );
}

const listUsers = (req, res) => {
    console.log('list users')
    res.render('User/list', {'users': userList} );
}

const registerUser = (req, res) => {
    console.log('user register')
    res.render('User/register', {'user': false, 'errors': false, 'action': 'register'});
}

const createUser = (req, res) => {
    console.log('create user')

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
        users.push(user);
        jsonTools.write('users.json', users);
        console.log('Usuario guardado');
        res.redirect ('/user/' + user.id);
    }
}

const editUser = (req, res) => {
    console.log('edit user')
    let users = jsonTools.read('users.json');
    let userID = parseInt(req.params.id);
    let user = users.filter( ({id}) => { return id === userID });
    res.render('User/register', {'user': user[0], 'errors': false, 'action': 'update'});
}

const updateUser = (req, res) => {
    console.log('update user')
    let user = createUserObject(req);
    user.id = parseInt(req.params.id);
    
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
        users[user_index] = user;
        jsonTools.write('users.json', users);
        console.log('Usuario actualizado');
        res.redirect ('/user/' + user.id);
    }
}

const userDelete = (req, res) => {
    console.log('delete user')
    let users = jsonTools.read('users.json');
    let userID = parseInt(req.params.id);
    let user = users.filter( ({id}) => { return id === userID });
    res.render('User/delete', {'user': user[0]});
}

const userDisable = (req, res) => {
    let userID = parseInt(req.params.id);
    let users = jsonTools.read('users.json');
    let user_index = users.findIndex( ({id}) => { return id === userID });
    console.log(user_index)
    console.log(users[user_index])
    users[user_index].active = false;
    jsonTools.write('users.json', users);
    console.log('Se elimino el usuario: ' + userID);
    res.redirect('/')
}

const userEnable = (req, res) => {
    let userID = parseInt(req.params.id);
    let users = jsonTools.read('users.json');
    let user_index = users.findIndex( ({id}) => { return id === userID });
    users[user_index].active = true;
    jsonTools.write('users.json', users);
    console.log('Se habilito el usuario: ' + userID);
    res.redirect('/user')
}

const login = (req, res) => {
    res.render('User/login');
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
    delete: userDelete,
    disable: userDisable,
    enable: userEnable
}

// exportamos el modulo.
module.exports = userController;