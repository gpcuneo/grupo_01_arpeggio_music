const db = require('../database/models');
const { Op } = require('sequelize');

let getTowns = (req, res) => {
    db.Town.findAll({
        where: { id_province: req.params.id },
        attributes: ['id', 'name']
    }).then( (towns) => res.json(towns)
)}

const apiController = {
    getTowns: getTowns
}

module.exports = apiController;