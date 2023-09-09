document.addEventListener('DOMContentLoaded',function(){
    const btnPlus= document.getElementById('increment')
    const btnMinus= document.getElementById('decrement')
    const submitByPost = document.getElementById('input-cart-shop')
    const numberStock = document.getElementById('stock-product')
    const notificacion = document.getElementById("notificacion");
    
    const getApiCart = async ()=>{
        const dataCart = await fetch(`/api/cart`);
        const response = await dataCart.json();
        const productsCart = await response.products;
        return productsCart;
    }
    const getApiProduct= async(id)=>{
        const data= await fetch(`/api/products/${id}`)
        const detail= await data.json();
        let product = await detail.product;
        return product;
    }
    
    let newCount = numberStock.innerText;
    const moreProduct= async()=>{
        btnPlus.onclick=async(e)=>{
            const id = e.target.value;
            const product = await getApiProduct(id)
            const stockMax = product.stock;
            let count = numberStock.innerText;
            if( count < stockMax){
                numberStock.innerText++
                newCount= numberStock.innerText;
            }
        }
    }
    moreProduct()
    const lessProduct= async()=>{
        btnMinus.onclick=async(e)=>{
            let count = numberStock.innerText;
            if(count > 1){
                numberStock.innerText--
                newCount= numberStock.innerText;
            }
        }
    }
    lessProduct()
    const addCountCart = async ()=>{
        const dataProducts = await getApiCart();
        const countCart = Array.from(document.querySelectorAll('.count-cart'))
        countCart.forEach(count => {
            count.innerText = dataProducts.length;
            count.style.display='block';
            const newCountCart = count.innerText;
            return newCountCart;
        })
    }
    const addProductCart = ()=>{
        submitByPost.onclick= async(e)=>{
            let id = e.target.value;
            let product = {
                productid: id.toString(),
                quantity: newCount, 
            }
            
            try {
                const response = await fetch('/api/cart',{
                    method:'POST',
                    credentials: 'include',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(product)
                });
                if(response.ok){
                    const dataResponse = await response.json();
                    console.log(`Producto agregado al carrito:${dataResponse}`);
                    notificacion.style.display = "block";
                    // Oculta la notificación después de un tiempo (por ejemplo, 3 segundos)
                    setTimeout(function() {
                        notificacion.style.display = "none";
                    }, 3000); // 3000 milisegundos = 3 segundos
                    await addCountCart()
                }else{
                    console.error('No se puedo agregar el producto al carrito');
                }
            } catch (error) {
                console.log(`Error al realizar la solicitud: ${error}`);
            }
        }
    }
    addProductCart();
})

