// Add SDK credentials
// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
//
const mp = new MercadoPago('TEST-118a6459-19fa-4836-929e-c1d8d4b76bec', {
    locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
});

const bricksBuilder = mp.bricks();
const renderCardPaymentBrick = async (bricksBuilder) => {
    const settings = {
        initialization: {
        amount: 100, // monto a ser pago
        payer: {
            email: "",
        },
        },
        customization: {
        visual: {
            style: {
            theme: 'default', // | 'dark' | 'bootstrap' | 'flat'
            }
        },
            paymentMethods: {
            maxInstallments: 1,
            }
        },
        callbacks: {
            onReady: () => {
                // callback llamado cuando Brick esté listo
            },
            onSubmit: (cardFormData) => {
                //  callback llamado cuando el usuario haga clic en el botón enviar los datos
                //  ejemplo de envío de los datos recolectados por el Brick a su servidor
                return new Promise((resolve, reject) => {
                fetch("/api/mp/createpreference", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cardFormData)
                })
                    .then((response) => {
                    // recibir el resultado del pago
                    const res = resolve();
                    console.log('pagado')
                    console.log(response)
                    })
                    .catch((error) => {
                    // tratar respuesta de error al intentar crear el pago
                    reject();
                    })
                });
            },
                onError: (error) => {
                    // callback llamado para todos los casos de error de Brick
                },
            },
    };

    window.cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
};

renderCardPaymentBrick(bricksBuilder);