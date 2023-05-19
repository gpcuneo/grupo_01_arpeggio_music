const getHistory = (req, res) => {
    const article =[
        {
            id:20,
            name:'',
            img:'/images/productos/image-37.jpg',
            price:30000,
            date:'24/11/2022',
            state:'Entregado',
            characteristics:'Bajo Eléctrico Aston Reed Ebs 150-20 Con funda y cable',
        },
        {
            id:21,
            name:'',
            img:'/images/productos/image-38.jpg',
            price:30000,
            date:'24/11/2022',
            state:'Cancelado',
            characteristics:'Microfóno Inalámbrico AKG P3 S dinámico cardioide negro',
        },
        {
            id:22,
            name:'',
            img:'/images/productos/image-39.jpg',
            price:30000,
            date:'24/11/2022',
            state:'Cargado',
            characteristics:'Teclado Portátil Yamaha Psr-f52 Psr-f52 Psr-f52',
        },
        {
            id:23,
            name:'',
            img:'/images/productos/image-37.jpg',
            price:30000,
            date:'24/11/2022',
            state:'Cancelado',
            characteristics:'Bajo Eléctrico Aston Reed Ebs 150-20 Con funda y cable',
        },
        {
            id:24,
            name:'',
            img:'/images/productos/image-38.jpg',
            price:30000,
            date:'24/11/2022',
            state:'Facturado',
            characteristics:'Microfóno Inalámbrico AKG P3 S dinámico cardioide negro',
        },
        {
            id:25,
            name:'',
            img:'/images/productos/image-39.jpg',
            price:30000,
            date:'24/11/2022',
            state:'Entregado',
            characteristics:'Teclado Portátil Yamaha Psr-f52 Psr-f52 Psr-f52',
        },
    ]
    res.render('shoppingHistory', { title:'Historial de compras', article},);
}

const historyController = {
    index:getHistory,
}

module.exports=historyController;