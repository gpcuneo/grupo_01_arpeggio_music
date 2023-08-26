import './App.css';
import '../src/assets/css/app.css'
import SideBar from './components/SideBar';
import ContentWrapper from './components/ContentWrapper';
import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [countProducts, setCountProducts] = useState(0)
  const [totalPageProd, setTotalPageProd] = useState(0)
  const [lastProduct, setLastProduct] = useState([])
  useEffect(() => {
    console.log('%cse montó el componente', 'color:green');
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products)
        setCountProducts(data.count)
        setTotalPageProd(data.totalPages)
      })
      .catch(error => console.error(error))
  }, [])
  useEffect(() => {
    console.log('se actualizo el componente');
    fetch(`http://localhost:3000/api/products?page=${totalPageProd}`)
      .then(response => response.json())
      .then(data =>{
        setLastProduct(data.products)
      })
      .catch(error=> console.error(error))
  }, [totalPageProd])

  useEffect(() => {
    if(lastProduct.length > 0){
      const detailProduct= lastProduct[lastProduct.length -1]
      setLastProduct(detailProduct)
    }
  }, [lastProduct])

  return (
    <>
      <div id="wrapper">
        <SideBar />
        <ContentWrapper
          products={products}
          countProduct={countProducts}
          detailProd={lastProduct}
        />
      </div>
    </>
  );
}

export default App;
