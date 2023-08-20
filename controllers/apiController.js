const db = require('../database/models');
const { Op } = require('sequelize');
require('dotenv').config();
const envs = process.env;


let getTowns = (req, res) => {
    db.Town.findAll({
        where: { id_province: req.params.id },
        attributes: ['id', 'name']
    }).then( (towns) => res.json(towns)
)}

const checkEmail = (req, res) => {
    db.User.findOne({
        where: { email: req.params.email },
        attributes: ['email']
    }).then( (email) => res.json(email)
)}

const addDetailForUser = (userList) => {
    const url = envs.APP_URL + ':' + envs.APP_PORT;
    return (userList.map( (user) => {
            user.dataValues.detail = url + '/user/' + user.userName;
            return user
        })
    );
}

const userList = async (req, res) => {
    let usersList = await db.User.findAll({
        attributes: ['userName', 'email'],
    });
    let usersData = {}
    usersData.users = addDetailForUser(usersList);
    usersData.count = usersData.users.length;
    return res.json(usersData);
}


const apiController = {
    getTowns: getTowns,
    checkEmail: checkEmail,
    userList: userList,
}

module.exports = apiController;