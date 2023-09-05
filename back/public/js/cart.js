document.addEventListener('DOMContentLoaded', function () {
    const priceSend = document.querySelector('#price-send-product')
    const totalPriceShop = document.querySelector('#total-price-shop')
    const subTotal = document.querySelector('#Sub-price-product')
    const containerArticle = document.querySelector('.container-article-all')
    const url = `/api/cart`;
    const getApiCart = async () => {
        const getCart = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        })
        const cartData = await getCart.json();
        const productsCart = await cartData;
        return productsCart;
    }
    const drawCartStatus = async (dataCart) => {
        const cart = await dataCart;
        const dataProducts = await cart.products;

        const createArticle = async (product) => {
            const img = await JSON.parse(product.image)
            const image = img[0]

            const article = document.createElement('article')
            article.innerHTML = `
            <div class="box-img-text">
            <img src="/images/productos/${image}" id="img" alt="">
            <div class="box-text-descrip">
                <h5 class="title-product name-product">${product.name}</h5>
                <p class="character">${product.name}</p>
                <p class="price-first price-value">$${product.price}</p>
            </div>
        </div>
        <div class="price-second">
            <p class="price-value">$${product.price}</p>
        </div>
        <div class="container-input-price">
            <div class="box-input-inc-dec">
                <button class="decrement" id="btn-decrement" value="${product.id}"> - </button>
                <p class="number count-product-${product.id}">${product.quantity}</p>
                <button class="increment" id="btn-increment" value="${product.id}"> + </button>
            </div>
            <div class="box-price-delete">
                <p class="total-price-product">$${product.totalPriceProduct}</p>
                <button class="delete" id="delete-btn" value="${product.id}"> x </button>
            </div>
        </div>
            `
            containerArticle.appendChild(article)
        }
        for (const product of dataProducts) {
            createArticle(product)
        };
        subTotal.innerText = `$${cart.totalPrice}`
        const costSend = priceSend.innerText;
        const valueNumber = parseFloat(costSend.replace(/\$/g, ''))
        const total = valueNumber + cart.totalPrice;
        totalPriceShop.innerText = `$${total}`;
        return containerArticle;
    }
    const getApiProduct = async (id) => {
        const data = await fetch(`/api/products/${id}`)
        const detail = await data.json();
        let product = await detail.product;
        return product;
    }
    const apiUpdate = async (body) => {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            if (response.ok) {
                const dataSend = await response.json();
                console.log(`El producto ${dataSend} se actualizo correctamente`);
                drawCartUpdateStatus();
            } else {
                console.error(`No se pudo actualizar el producto`);
            }
        } catch (error) {
            console.error(`Error al actualizar el producto :${error}`);
        }
    }
    const sendUpdateOfProducts = async () => {
        containerArticle.addEventListener('click', async (e) => {
            if (e.target.classList.contains('increment')) {
                const id = e.target.value;
                const newQuantity = containerArticle.querySelector(`.count-product-${id}`)
                const product = await getApiProduct(id);
                const stock = await product.stock;
                let quantity = newQuantity.innerText;
                if (quantity < stock) {
                    newQuantity.innerHTML++
                    let newUpdateQuantity = newQuantity.innerText
                    let body = {
                        quantity:newUpdateQuantity,
                        productid:id.toString()
                    };
                    apiUpdate(body)
                }
            } else if (e.target.classList.contains('decrement')) {
                const id = e.target.value;
                const newQuantity = containerArticle.querySelector(`.count-product-${id}`)
                let quantity = newQuantity.innerText;
                if (quantity > 1) {
                    newQuantity.innerHTML--
                    let newUpdateQuantity = newQuantity.innerText
                    let body = {
                        quantity:newUpdateQuantity,
                        productid:id.toString()
                    };
                    apiUpdate(body)
                }
            }
        })
    }
    const deleteProductCart = async () => {
        containerArticle.addEventListener('click', async (e) => {
            if (e.target.classList.contains('delete')) {
                const id = e.target.value;
                let body = {
                    productid: id.toString(),
                }
                console.log(`estas haciendo click a : ${id}`);
                try {
                    const response = await fetch(url, {
                        method: 'DELETE',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    })
                    if (response.ok) {
                        const dataSend = await response.json();
                        drawCartUpdateStatus()
                        console.log(`El producto ${dataSend} se elimino correctamente`);
                    } else {
                        console.error(`No se pudo eliminar el producto`);
                    }
                } catch (error) {
                    console.log(`Error al eliminar el producto :${error}`);
                }
            }
        })
    }
    const drawCartUpdateStatus = async () => {
        containerArticle.innerHTML = ''
        const dataProductCart = await getApiCart();
        const datos = await drawCartStatus(dataProductCart)
        sendUpdateOfProducts(dataProductCart)
        deleteProductCart();
        return datos
    }
    drawCartUpdateStatus();
})