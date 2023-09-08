const db = require('../database/models');

const getOrder = async (orderId) => {
    try {
        const result = await db.Order.findOne({
            where: {
                id: orderId
            },
        });
        return result;
    } catch (error) {
        console.error('Error al obtener la irden:', error);
        throw error;
    }
}

const getLastOrder = async (userID) => {
    try {
        const result = await db.Order.findOne({
            where: {
                user_id: userID
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        return result;
    } catch (error) {
        console.error('Error al obtener el último preference_id:', error);
        throw error;
    }
}

const getOrdersPayed = async (userId) => {
    try {
        const orders = await db.Order.findAll({
            attributes: [
                [db.sequelize.fn('DISTINCT', db.sequelize.col('id')), 'id'],
                'status',
                'createdAt',
            ],
            where: {
                status: 'payed',
                user_id: userId,
            },
        });
        if (orders) {
            return orders;
        } else {
            return null;
        }
        } catch (error) {
            console.error('Error al obtener la información del pedido:', error);
            throw error;
        }
}

const updateStatus = async (orderId, status) => {
    try {
        const result = await db.Order.update(
            {status: status},
            { where: { id: orderId }}
        );
        return result;
    } catch (error) {
        console.error('Error al actualizar la orden de compra:', error);
        throw error;
    }
}



const order = {
    //getOrders: getOrders,
    getOrder: getOrder,
    getLastOrder: getLastOrder,
    updateStatus: updateStatus,
    getOrdersPayed: getOrdersPayed,
}

module.exports = order;