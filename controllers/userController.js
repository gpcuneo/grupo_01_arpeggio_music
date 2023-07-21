const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jsonTools = require('../utils/JSONTools');
const netTools = require('../utils/networkTools');
const userTools = require('../utils/User');
const db = require('../database/models');
const { Op } = require('sequelize');
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
        id_town: parseInt(req.body.city),
        dni: parseInt(req.body.dni),
        phone: parseInt(req.body.phone),
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        active: true,
        lastIP : netTools.getUserIP(req)
    }
}

const comparePassword = (user) => {
    let result = user.password === user.confirmPassword ? true : false;
    return result;
}

const validateUserFields = async (user, req, id=false) => {
    let errors = validationResult(req).mapped();
    if(id) { 
        delete errors.password
    } else {
        comparePassword(user) ? '' : errors.password = {msg :'Las contrasenas no coinciden'};
    }
    console.log(errors)
    await db.User.findOne({where: {userName : user.userName, id: {[Op.ne]: id}}}) ? errors.dni = {msg : 'El DNI ya se encuentra registrado'} : '' ;
    await db.User.findOne({where: {dni : user.dni, id: {[Op.ne]: id}}}) ? errors.userName = {msg : 'El nombre de usuario ya fue usado'} : '' ;
    await db.User.findOne({where: {email : user.email, id: {[Op.ne]: id}}}) ? errors.email = {msg : 'El email ya se encuentra registrado'} : '' ;
    // Query mas eficiente pero no puedo controlar el mensaje de error por campo.
    // const users = await db.User.findAll({
    //     where: {
    //         [Op.or]: [
    //             { dni: user.dni},
    //             { userName: user.userName}, 
    //             { email: user.email},
    //         ],
    //     }, 
    //     });
    console.log( " ------------ errors")
    console.log(errors)
    return errors 
}

const showUser = async (req, res) => {
    const user = await db.User.findOne({ where: { userName: req.params.userName } });
    console.log('Show profile: ' + user);
    res.render('User/profile', {'user': user, 'orderHistory': orderHistory} );
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

const createUser = async (req, res) => {
    let user = createUserObject(req);
    // Se crea un objeto de errores con la finalidad de poblarlo con aquellos datos que 
    // ya se encuentren registrados por otro usuario y poder notificarle al usuario enviandolo a la vista.
    errors = await validateUserFields(user, req);
    if (Object.keys(errors) != 0) {
        console.log('hay errores', errors);
        res.render('User/register', {'user': user, 'errors': errors, 'action': 'register'});
    } else {
        user.id = uuid.v4();
        user.image = 'default.avif';
        user.id_rol = 1
        user.password = bcrypt.hashSync(user.password, 10);
        delete(user.confirmPassword);
        db.User.create(user);
        console.log('Usuario guardado');
        res.redirect ('/user/' + user.userName);
    }
}

const editUser = async (req, res) => {
    let user = await db.User.findOne({where: {userName: req.params.userName}})
    delete(user.password)
    delete(user.confirmPassword)
    res.render('User/register', {'user': user, 'errors': false, 'action': 'update'});
}

const updateUser = async (req, res) => {
    let user = createUserObject(req);
    let userID = await db.User.findOne({
        where: {userName: req.params.userName},
        attributes: ['id']
    });
    //userSearch = req.params.userName;
    // Se crea un objeto de errores con la finalidad de poblarlo con aquellos datos que 
    // ya se encuentren registrados por otro usuario y poder notificarle al usuario enviandolo a la vista.
    errors = await validateUserFields(user, req, userID.id);
    if (Object.keys(errors) != 0) {
        console.log('hay errores', errors);
        res.render('User/register', {'user': user, 'errors': errors, 'action': 'update'});
    } else {
        delete user.password;
        await db.User.update(user, {
            where: { id: userID.id },
            returning: false
        });
        console.log('Usuario actualizado: ' + user.userName);
        res.redirect ('/user/' + user.userName);
    }
}

const updatePassword = async (req, res) => {
    let userName = req.params.userName;
    if(req.body.password === req.body.confirmPassword) {
        let userID = await db.User.findOne({
            where: {userName: userName},
            attributes: ['id']
        });
        let user = {}
        user.password = bcrypt.hashSync(req.body.password, 10);
        user.lastIP = netTools.getUserIP(req);
        await db.User.update(user, {
            where: { id: userID.id },
            returning: false
        });
        console.log('Password actualizado del usuario: ' + userName );
    }
    res.redirect ('/user/' + userName);
}

const userDelete = async (req, res) => {
    let userName = req.params.userName;
    console.log(userName) 
    let user = await db.User.findOne({where:{ userName: userName}})
    res.render('User/delete', {'user': user});
}

const changeStatus = async (req, res) => {
    let userName = req.params.userName;
    let status = await db.User.findOne({
        where: {userName: userName},
        attributes: ['active']
    });
    await db.User.update({ active: !status.active }, {
        where: { userName: userName },
        returning: false
    });
    console.log('Se Modifico el estado del usuario: ' + userName);
    res.redirect('/');
}

const login = (req, res) => {
    if(userTools.isLogged(req)) {
        res.redirect('/');    
    } else {
        res.render('User/login', {'user': false, 'error': false});
    }
}

const userLogin = async (req, res) => {
    //let userFound = users.filter( ({userName}) => { return userName === user.userName })[0];
    let user = await db.User.findOne({where: {userName: req.body.userName}})
    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password) && user.active){
            console.log('logged');
            if(!!req.body.remember) {
                res.cookie('userName', user.userName, {
                    maxAge: 1000 * 60 * 60 * 24 * 30
                });
            }
            delete user.id;
            delete user.password;
            req.session.user = user;
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

const uploadImage = async (req, res) => {
    let userName = req.params.userName;
    let img = { image: req.file.filename}
    await db.User.update(img, {
        where: { userName: userName },
        returning: false
    });
    console.log('Se actualizo la imagen del usuario: ' + userName);
    res.redirect ('/user/'+userName);
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
    disable: changeStatus,
    enable: changeStatus,
    export: exportUserlist,
}

module.exports = userController;