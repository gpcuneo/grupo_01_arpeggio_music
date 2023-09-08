const db = require('../database/models');
const cart = require('../models/cart');
require('dotenv').config();
const envs = process.env;

const urlBase = `http://${envs.APP_URL}:${envs.APP_PORT}/payment`;

const getUserID = async (userName) => {
    const userID = await db.User.findOne({
        where: { userName: userName },
        attributes: ['id']
    });
    return userID.id;
}

const mercadopago = require("mercadopago");
mercadopago.configure({
    access_token: "TEST-4828293259593186-122423-21648a5eebeb58c9376a626ed34beb1f-56415458",
});

const createPurchaseOrder = async (preference, userId, delivery_id) => {
	const orderData = {
		preference_id: preference,
		user_id: userId,
		delivery_id: delivery_id,
        status: 'temp'
	}
	const result = await db.Order.create(orderData);
	return result
}

const createPreference = async (req, res) => {
	const user = await getUserID(req.cookies.userName);
    const userCart = await cart.getCart(user)
	const preference = {
		items: [
			{
                title: 'Productos',
				description: "Payment for product",
				unit_price: userCart.totalPrice,
				quantity: 1,
			}
		],
		back_urls: {
			"success": urlBase,
			"failure": urlBase,
			"pending": urlBase
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then( (response) => {
			preferenceId = response.body.id
			getUserID(req.cookies.userName)
				.then( (data) => {
					userID = data
					return createPurchaseOrder(preferenceId, userID, 3)
						.then( (data) => {
							if(data) {
								return res.json({
									id: preferenceId
								});
							}
						})
				})
		}).catch(function (error) {
			console.log(error);
		});
};

const payByCard = (req, res) => {
    var mercadopago = require('mercadopago');
    mercadopago.configurations.setAccessToken("TEST-4828293259593186-122423-21648a5eebeb58c9376a626ed34beb1f-56415458");
    mercadopago.payment.save(req.body)
        .then(function(response) {
            const { status, status_detail, id } = response.body;
            res.status(response.status).json({ status, status_detail, id });
        })
        .catch(function(error) {
            console.error(error);
        });
}

const marcadoPagoController = {
    createPreference: createPreference,
    payByCard: payByCard
}

module.exports = marcadoPagoController;