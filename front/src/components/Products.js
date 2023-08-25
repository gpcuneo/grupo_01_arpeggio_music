import React ,{useState, useEffect} from 'react'

function Products() {
    const [products,setProducts] = useState([]);
    const [countProducts, setCountProducts]= useState(0)
    useEffect(()=>{
        console.log('%cse montó el componente', 'color:green');
        fetch('http://localhost:3000/api/products')
        .then( response => response.json())
        .then(data =>{
            setProducts(data.products)
            setCountProducts(data.count)
        })
        .catch(error => console.error(error))
    },[])
    useEffect(()=>{
        console.log('%cse actualizó el componente','color:yellow');
    },[products])
    return (
        <>
            <h1>Soy el componente Productos</h1>
            <h3>Catidad de productos: {countProducts}</h3>
            <h3>Estás en la pagina:</h3>
            <ul>
                {products.length === 0 && <p>Cargando...</p>}
                {
                    products.map((product,index)=>{
                        return(
                            <li key={product.id}>
                                <h3>{product.name}</h3>
                                <h4>{product.characteristics}</h4>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default Products;