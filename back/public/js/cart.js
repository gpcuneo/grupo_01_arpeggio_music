document.addEventListener('DOMContentLoaded', function () {
    const totalPriceShop = document.querySelector('#total-price-shop')
    const containerArticle = document.querySelector('.container-article-all')
    const btnFinish = document.getElementById('finish');
    const btnSearchMore = document.getElementById('searchMore');

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
    const showMainSecond = async ()=>{
        const apiCart = await getApiCart();
        const productsData = await apiCart.products;
        const secondMain = document.getElementById('second-main')
        const firstMain = document.getElementById('first-main')
        if(productsData.length < 1){
            secondMain.style.display = 'block';
            firstMain.style.display='none';
        }else{
            secondMain.style.display = 'none';
            firstMain.style.display='block';
        }
    }
    const minusCountCart = async ()=>{
        const productsData = await getApiCart();
        const products = await productsData.products;
        const countCart = Array.from(document.querySelectorAll('.count-cart'))
        countCart.forEach(count => {
            count.innerText = products.length;
            const newCountCart = count.innerText;
            return newCountCart;
        })
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
        totalPriceShop.innerText = `$${cart.totalPrice}`;
        return containerArticle;
    }
    const getApiProduct = async (id) => {
        const data = await fetch(`/api/products/${id}`)
        const detail = await data.json();
        let product = await detail.product;
        return product;
    }
    const apiUpdateAndDelete = async (body, method) => {
        try {
            const response = await fetch(url, {
                method: method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            if (response.ok) {
                drawCartUpdateStatus();
                const dataSend = await response.json();
                console.log(`El producto ${dataSend} se actualizo correctamente`);
            } else {
                console.error(`No se pudo actualizar el producto`);
            }
        } catch (error) {
            console.error(`Error al actualizar el producto :${error}`);
        }
    }
    const sendUpdateOfProducts = async () => {
        const btnPlus = Array.from(containerArticle.querySelectorAll('.increment'))
        const btnMinus = Array.from(containerArticle.querySelectorAll('.decrement'))
        
        btnPlus.forEach(button =>{
            button.addEventListener('click', async(e)=>{
                const id = e.target.value;
                const newQuantity= containerArticle.querySelector(`.count-product-${id}`)
                const product = await getApiProduct(id);
                const stock = await product.stock;
                const quantity = newQuantity.innerText;
                if(quantity < stock){
                    newQuantity.innerText++
                    let newUpdateQuantity = await newQuantity.innerText
                    console.log(newUpdateQuantity);
                    let body = {
                        newQuantity: newUpdateQuantity,
                        productid: id.toString()
                    };
                    await apiUpdateAndDelete(body,'PUT')
                }
            })
        })
        btnMinus.forEach(button =>{
            button.addEventListener('click', async(e)=>{
                const id = e.target.value;
                const newQuantity = containerArticle.querySelector(`.count-product-${id}`)
                let quantity = newQuantity.innerText;
                if (quantity > 1) {
                    newQuantity.innerHTML--
                    let newUpdateQuantity = await newQuantity.innerText
                    console.log(newUpdateQuantity);
                    let body = {
                        newQuantity: newUpdateQuantity,
                        productid: id.toString()
                    };
                    await apiUpdateAndDelete(body,'PUT')
                }
            })
        })
    }
    const deleteProductCart = async () => {
        const btnDelete = Array.from(containerArticle.querySelectorAll('.delete'))
        btnDelete.forEach(button =>{
            button.addEventListener('click', async(e) =>{
                const id = e.target.value;
                let body = {
                    productid: id.toString(),
                }
                await apiUpdateAndDelete(body,'DELETE')
                await minusCountCart()
            })
        })
    }
    const drawCartUpdateStatus = async () => {
        containerArticle.innerHTML = ''
        const dataProductCart = await getApiCart();
        const datos = await drawCartStatus(dataProductCart)
        sendUpdateOfProducts();
        deleteProductCart();
        showMainSecond()
        return datos
    }
    drawCartUpdateStatus();

    btnFinish.addEventListener('click', () => {
        window.location.href = "/checkout";
    });

    btnSearchMore.addEventListener('click', () => {
        window.location.href = "/store";
    });
})