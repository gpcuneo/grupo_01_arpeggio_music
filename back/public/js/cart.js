document.addEventListener('DOMContentLoaded', function () {
    const btnPlus = Array.from(document.querySelectorAll('.increment'))
    const btnMinus = Array.from(document.querySelectorAll('.decrement'))
    const priceSend = document.querySelector('#price-send-product')
    const totalPriceShop = document.querySelector('#total-price-shop')
    const subTotal = document.querySelector('#Sub-price-product')
    const containerArticle = document.querySelector('.container-article-all')
    const url = `http://localhost:3001/api/cart`;
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
        
        const createArticle = async (product)=>{
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
                <button class="decrement" id="btn-decrement" > - </button>
                <p class="number count-product">${product.quantity}</p>
                <button class="increment" id="btn-increment"> + </button>
            </div>
            <div class="box-price-delete">
                <p class="total-price-product">$${product.totalPriceProduct}</p>
                <button class="delete"> x </button>
            </div>
        </div>
            `
            containerArticle.appendChild(article)
        }

        for( const product of dataProducts) {
            createArticle(product)
        };
        subTotal.innerText = `$${cart.totalPrice}`
        const costSend = priceSend.innerText;
        const valueNumber = parseFloat(costSend.replace(/\$/g, ''))  
        const total = valueNumber + cart.totalPrice;
        totalPriceShop.innerText = `$${total}`;
        return containerArticle;
    }
    const sendUpdateOfProducts = (productId, action) => {
        
    }
    const deleteProductCart = () => {

    }
    const drawCartUpdateStatus = async () => {
        containerArticle.innerHTML= ''
        const dataProductCart = await getApiCart();
        const datos = await drawCartStatus(dataProductCart)
        return datos
    }
    drawCartUpdateStatus();
})