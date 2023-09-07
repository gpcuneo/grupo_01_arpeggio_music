// Add SDK credentials
// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
//
const mercadopago = new MercadoPago('TEST-118a6459-19fa-4836-929e-c1d8d4b76bec', {
    locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
});

document.addEventListener('DOMContentLoaded', function () {
        const orderData = {
        quantity: 1,
        description: 'Solo es dummy, manejamos en el back',
        price: 1000
    };

    fetch("/api/mp/createpreference", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (preference) {
            createCheckoutButton(preference.id);
        });
});

function createCheckoutButton(preferenceId) {
    const bricksBuilder = mercadopago.bricks();
    const renderComponent = async (bricksBuilder) => {
        if (window.checkoutButton) window.checkoutButton.unmount();
        await bricksBuilder.create(
        'wallet',
        'button-checkout',
        {
            initialization: {
            preferenceId: preferenceId,
            },
            callbacks: {
            onError: (error) => console.error(error),
            onReady: () => {}
            }
        });
    };
    window.checkoutButton = renderComponent(bricksBuilder);
}