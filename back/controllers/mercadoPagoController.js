const mercadopago = require("mercadopago");
mercadopago.configure({
    access_token: "TEST-4828293259593186-122423-21648a5eebeb58c9376a626ed34beb1f-56415458",
});

const createPreference = (req, res) => {
	let preference = {
		items: [
			{
				// title: req.body.description,
				// unit_price: Number(req.body.price),
				// quantity: Number(req.body.quantity),
                title: 'bateria',
				unit_price: 2000,
				quantity: 5,
                picture_url: 'http://192.168.0.120:3001/images/productos/image-32.jpg'
			}
		],
		back_urls: {
			"success": "/home",
			"failure": "/home",
			"pending": "/home"
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
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
            console.log(response.body)
            console.log(status)
            console.log(status_detail)
            console.log(id)
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