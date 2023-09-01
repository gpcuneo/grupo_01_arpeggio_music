document.addEventListener('DOMContentLoaded',function(){
    const btnPlus = Array.from(document.querySelectorAll('.increment'))
    const btnMinus= Array.from(document.querySelectorAll('.decrement'))
    const count = Array.from(document.querySelectorAll('.count-product'))
    count.forEach(stock =>{
        stock.onclick=(e)=>{
            let value= stock.innerHTML
            console.log(value);
        }
    })
    btnMinus.forEach(btn =>{
        btn.onclick=(e)=>{
            let value = e.target.value;
            console.log('estas restando'+value);
            
        }
    })
    btnPlus.forEach(btn =>{
        btn.onclick =()=>{
            console.log('estas sumando');
        }
    })
})