//llamo a la api de detalle de producto 
//primero capturar los eventos botones de mas y menos
//segundo capturar el boton de agregar al carrito
//tercero enviar por fech por el metodo post el value de los botones del stock elegido;
document.addEventListener('DOMContentLoaded',function(){
    const btnPlus= document.getElementById('increment')
    const btnMinus= document.getElementById('decrement')
    const submitByPost = document.getElementById('input-cart-shop')
    const numberStock = document.getElementById('stock-product')
    /* numberStock.innerText > 1? (numberStock.innerText=1):numberStock.innerText; */
    
    const getApiProduct= async(id)=>{
        const data= await fetch(`http://localhost:3001/api/products/${id}`)
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
