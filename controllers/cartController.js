let getCart = (req, res)=>{
    const costShop={
        discount:25,
        costSend: 2500,
    }
    const cart=[
        {
            id: 1,
            name:'Bajo Eléctrico',
            price:23000,
            total:23000,
            img:'/images/productos/image-37.jpg',
            stock:1,
            characteristics:'Bajo Eléctrico Aston Reed Ebs150-20 con funda y cable',
        },
        {
            id: 2,
            name:'Microfóno Inalámbrico',
            price:10000,
            total:10000,
            img:'/images/productos/image-38.jpg',
            stock:1,
            characteristics:'Microfóno Inalámbrico AKG P3 S dinámico cardioide negro',
        },
        {
            id: 3,
            name:'Teclado Portátil',
            price:45000,
            total:45000,
            img:'/images/productos/image-39.jpg',
            stock:1,
            characteristics:'Teclado Portátil Yamaha Psr-f52 Psr-f52 Psr-f52',
        },
    ]
    res.render('productCart', {title:'Mi carrito', cart, costShop})
}

const cartController ={
    cart:getCart,
}

module.exports=cartController;