const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const ExcelJS = require('exceljs');
const fs = require('fs');
//const jsonTools = require('../utils/JSONTools');
const netTools = require('../utils/networkTools');
const userTools = require('../utils/User');
const db = require('../database/models');
const Order = require('../models/order');
const { Op, INTEGER } = require('sequelize');
const {validationResult} = require('express-validator');
const { query } = require('express');


const createUserObject = (req) => {
    return {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        emailValidated: req.body.emailValidated,
        address: req.body.address,
        id_province: parseInt(req.body.city),
        id_town: parseInt(req.body.town),
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
    await db.User.findOne({where: {userName : user.userName, id: {[Op.ne]: id}}}) ? errors.dni = {msg : 'El DNI ya se encuentra registrado'} : '' ;
    await db.User.findOne({where: {dni : user.dni, id: {[Op.ne]: id}}}) ? errors.userName = {msg : 'El nombre de usuario ya fue usado'} : '' ;
    await db.User.findOne({where: {email : user.email, id: {[Op.ne]: id}}}) ? errors.email = {msg : 'El email ya se encuentra registrado'} : '' ;
    user.city === 0 ? errors.city = {msg : 'Seleccione una provincia valida'} : '' ;
    user.town === 0 ? errors.town = {msg : 'Selecciona una localidad valida'} : '' ;
    return errors 
}

const buildOrderInvoiceShipping = async (userId) => {
    try {
        const orders = await Order.getOrdersPayed(userId);
        if (orders) {
            let results = orders.map(order => {
                return {
                    id: order.id,
                    status: order.status,
                    total: order.Invoice ? order.Invoice.total : null,
                    shippingStatus: order.Shipping ? order.Shipping.status : null,
                    createdAt: order.createdAt ? order.createdAt : null,
                };
            });
            // Add Invoice data
            for(let i=0; i < results.length; i++) {
                const invoice = await db.Invoice.findOne({
                    where: {order_id: results[i].id},
                    attributes: ['total']
                });
                results[i].total = invoice.total;
            }
            // Add Shipping data
            for(let i=0; i < results.length; i++) {
                const shipping = await db.Shipping.findOne({
                    where: {order_id: results[i].id},
                    attributes: ['status']
                });
                results[i].shippingStatus = shipping.status;
            }
            return results;
        } else {
            return null;
        }
        } catch (error) {
            console.error('Error al obtener la información del pedido:', error);
            throw error;
        }
}


const formatDate = (orderHistory) => {
    const timeZone = "America/Argentina/Buenos_Aires";
    const formatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: timeZone,
        // timeZoneName: "short"
    };

    for(let i=0; i<orderHistory.length; i++) {
        const originalDate = new Date(orderHistory[i].createdAt);
        const strDate = originalDate.toLocaleString("es-AR", formatOptions);
        orderHistory[i].date = strDate
    }
    return orderHistory;
}

const showUser = async (req, res) => {
    const user = userTools.isLogged(req);
    // const user = await db.User.findOne({
    //                             where: { userName: req.params.userName },
    //                             include: [
    //                                 {association: 'Town', as: 'town'},
    //                                 {association: 'Province', as: 'province'},
    //                             ]
    //                         });
    const orderHistory = await buildOrderInvoiceShipping(user.id); 
    const orderHistoryFormated = formatDate(orderHistory);
    res.render('User/profile', {'user': user, 'orderHistory': orderHistoryFormated} );
}

const listUsers = async (req, res) => {
    const userInfo = userTools.isLogged(req);
    const limit = 3;
    let pageLimit = 0
    const page = parseInt(req.query.page) || 0;
    const offset = page * limit;
    const searchData = req.query.searchData;
    const searchField = req.query.searchField;

    let query = {
        limit,
        offset,
        include: [
            {association: 'Town', as: 'town'},
            {association: 'Province', as: 'province'},
            ]
        };
    if(searchField && searchData) {
        searchField === 'userName' ? query['where'] = { userName: { [Op.like]: `%${searchData}%` } } : '';
        searchField === 'lastName' ? query['where'] = { lastName: { [Op.like]: `%${searchData}%` } } : '';
        searchField === 'dni' ? query['where'] = { dni: { [Op.like]: `%${parseInt(searchData)}%` } } : '';
    }
    users = await db.User.findAll(query);
    if(searchField && searchData) {
        pageLimit = Math.ceil(users.length / 3) -1; 
    } else {
        usersCount = await db.User.count();
        pageLimit = Math.ceil(usersCount / 3) -1; 
    }
    return res.render('User/list', {users, user: userInfo, page, pageLimit});
}

const registerUser = async (req, res) => {
    if(userTools.isLogged(req)) {
        res.redirect('/')
    } else {
        const provinces = await db.Province.findAll({attributes: ['id', 'name']});
        res.render('User/register', {'user': false, 'errors': false, 'action': 'register', provinces});
    }
}

const createUser = async (req, res) => {
    let user = createUserObject(req);
    errors = await validateUserFields(user, req);
    if (Object.keys(errors) != 0) {
        console.log('hay errores', errors);
        const provinces = await db.Province.findAll({attributes: ['id', 'name']});
        const towns = await db.Town.findAll({
            where: {id_province: user.id_province},
            attributes: ['id', 'name']}
        );
        res.render('User/register', {'user': user, 'errors': errors, 'action': 'register', provinces, towns});
    } else {
        user.id = uuid.v4();
        user.image = 'default.avif';
        user.id_rol = 1
        user.password = bcrypt.hashSync(user.password, 10);
        delete(user.confirmPassword);
        db.User.create(user);
        console.log('Usuario creo el usuario: ' + user.userName);
        res.redirect ('/user/' + user.userName);
    }
}

const editUser = async (req, res) => {
    const user = userTools.isLogged(req);
    //let user = await db.User.findOne({where: {userName: req.params.userName}})
    //delete(user.id)
    delete(user.password)
    delete(user.confirmPassword)
    const provinces = await db.Province.findAll({attributes: ['id', 'name']});
    const towns = await db.Town.findAll({
        where: {id_province: user.id_province},
        attributes: ['id', 'name']}
    );
    res.render('User/register', {'user': user, 'errors': false, 'action': 'update', provinces, towns});
}

const updateUser = async (req, res) => {
    let user = createUserObject(req);
    let userID = await db.User.findOne({
        where: {userName: req.params.userName},
        attributes: ['id']
    });
    errors = await validateUserFields(user, req, userID.id);
    if (Object.keys(errors) != 0) {
        console.log(' --- hay errores', errors);
        res.render('User/register', {'user': user, 'errors': errors, 'action': 'update'});
    } else {
        delete user.password;
        await db.User.update(user, {
            where: { id: userID.id },
            returning: false
        });
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
    }
    res.redirect ('/user/' + userName);
}

const userDelete = async (req, res) => {
    const user = userTools.isLogged(req);
    // let userName = req.params.userName;
    // let user = await db.User.findOne({where:{ userName: userName}})
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
    userName = req.body.userName;
    let user = await db.User.findOne({where: {userName: req.body.userName}})
    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password) && user.active){
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
            console.log('Error de login: ' + userName);
            res.render('User/login', {'user': user, 'error': true});
        }
    } else {
        console.log('userName error: ' + userName);
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
    res.redirect ('/user/'+userName);
}

const exportUserlist = async (req, res) => {
    try {
        // Realiza el findAll() para obtener los datos de la tabla User
        const columns = ['userName', 'firstName', 'lastName', 'email', 'dni', 'phone', 'address', ];
        const users = await db.User.findAll();
        // Crea un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();

        // Crea una nueva hoja en el libro
        const worksheet = workbook.addWorksheet('Usuarios');

        // Crea el encabezado de la hoja con los nombres de las columnas
        worksheet.addRow(columns);

        // Agrega los datos de los usuarios a la hoja
        users.forEach((user) => {
            const values = columns.map((column) => user[column]);
            worksheet.addRow(values);
        });

        // Crea un stream para guardar el archivo Excel
        const tempFileName = 'usuarios.xlsx';
        const stream = fs.createWriteStream(tempFileName);
        await workbook.xlsx.write(stream);

        // Configura la respuesta para descargar el archivo
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=usuarios.xlsx');

        // Envía el archivo Excel como respuesta
        const fileStream = fs.createReadStream(tempFileName);
        fileStream.pipe(res);

        // Elimina el archivo temporal después de enviarlo
        fileStream.on('end', () => {
            fs.unlinkSync(tempFileName);
        });

        console.log('Archivo Excel generado correctamente:', tempFileName);
    } catch (error) {
        console.error('Error al generar el archivo Excel:', error);
    }
};


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