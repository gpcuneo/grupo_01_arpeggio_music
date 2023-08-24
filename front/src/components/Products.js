import React ,{useState, useEffect} from 'react'

function Products() {
    const [products,setProducts] = useState([]);
    
    useEffect(()=>{
        console.log('%cse montó el componente', 'color:green');
        fetch('http://localhost:3000/api/products')
        .then( response => response.json())
        .then(data =>{
            console.log(data)
        })
        .catch(error => console.error(error))
    })
    return (
        <>
            <h1>Soy el componente Productos</h1>
            <h3>Estás en la pagina:</h3>
            <ul></ul>
        </>
    )
}

export default Products;