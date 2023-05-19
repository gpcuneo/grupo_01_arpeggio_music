
let getDetail=(req, res)=>{
    const product={
        name:'Batería Acústica',
        img:'/images/productos/image-32.jpg',
        price:250000,
        discount:20,
        characteristics:'Batería Acústica 5 cuerpos 20 14 12 10 Yamaha Rydeen Rdp0f5',
        stock: 1,
        descripcion:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis aperiam assumenda a corrupti quaerat enim fugiat eum veniam corporisminus quia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem est nihil accusamus esse deserunt iste? Odio quo magni excepturi molestiae maiores cupiditate hic repellendus ipsum! Eius maxime ad assumenda provident',
        store:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nobis eveniet harum non, suscipit mollitia recusandae quidem blanditiis aperiam assumenda a corrupti quaerat enim fugiat eum veniam corporisminus quia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem est nihil accusamus esse deserunt iste? Odio quo magni excepturi molestiae maiores cupiditate hic repellendus ipsum! Eius maxime ad assumenda provident',
    }
    const images=[
        {
            img:'/images/productos/image-32.jpg'
        },
        {
            img:'/images/productos/image-33.jpg'
        },
        {
            img:'/images/productos/image-34.jpg'
        },
        {
            img:'/images/productos/image-35.jpg'
        },
    ]
    const articles=[
        {
            name:'Redoblante',
            price:68800,
            characteristics:'Redoblante Roadshow 14x6,5 8 Torres Rsn1465s',
            img:'/images/productos/image-46.jpg'
        },
        {
            name:'Pedal de bombo',
            price:20000,
            characteristics:'Pedal de Bombo Hebikuo G610 Cadena Doble base metalica',
            img:'/images/productos/image-47.jpg'
        },
        {
            name:'Bombo de Bateria',
            price:100000,
            characteristics:'Bombo de Bateria Pearl Forum Fzh2218b/c 22x18',
            img:'/images/productos/image-48.jpg'
        },
        {
            name:'Set de Platillos',
            price:25000,
            characteristics:'Set de platillos Zildjian Zp1418 Hi Hat 14 Cash 18 Palillos',
            img:'/images/productos/image-49.jpg'
        },
    ]
    res.render('productDetail', {title:'Detalle del Producto',product, articles, images});
}
let getDelete = (req, res)=>{
    res.render('productDelete')
}
let getCreate = (req, res)=>{
    res.render('newProduct')
}

let getUpDate = (req, res)=>{
    res.render('editProduct')
}
let getId = (req, res)=>{
    if(req.params.id){
        console.log(req.params.id)
    }
    res.render('productDetail')
}
const productController={
    product:getDetail,
    showbyid:getId,
    create:getCreate,
    update:getUpDate,
    delete:getDelete,
}


module.exports=productController;