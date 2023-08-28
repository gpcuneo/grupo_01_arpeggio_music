import './App.css';
import '../src/assets/css/app.css'
import SideBar from './components/SideBar';
import ContentWrapper from './components/ContentWrapper';
import React, { useState, useEffect } from 'react';
import { UserProvider } from './context/user';
import { ProductProvider } from './context/product';

console.log(process.env.REACT_APP_BACK_NAME)
console.log(process.env.REACT_APP_BACK_PORT)

const domain = process.env.REACT_APP_BACK_NAME
const port = process.env.REACT_APP_BACK_PORT

const urlBase = `http://${domain}:${port}/api`;

function App() {
  /* const [products, setProducts] = useState([]); */
  /* const [countProducts, setCountProducts] = useState(0) */
  const [totalPageProd, setTotalPageProd] = useState(0)
  const [lastProduct, setLastProduct] = useState([])
  useEffect(() => {
    console.log('%cse montó el componente', 'color:green');
    fetch(`${urlBase}/products`)
      .then(response => response.json())
      .then(data => {
        /* setProducts(data.products) */
        /* setCountProducts(data.count) */
        setTotalPageProd(data.totalPages)
      })
      .catch(error => console.error(error))
  }, [])
  useEffect(() => {
    console.log('se actualizo el componente');
    fetch(`${urlBase}/products?page=${totalPageProd}`)
      .then(response => response.json())
      .then(data => {
        setLastProduct(data.products)
      })
      .catch(error => console.error(error))
  }, [totalPageProd])

  useEffect(() => {
    if (lastProduct.length > 0) {
      const detailProduct = lastProduct[lastProduct.length - 1]
      setLastProduct(detailProduct)
    }
  }, [lastProduct])

  return (
    <>
      <div id="wrapper">
        <SideBar />
        <ProductProvider>
          <UserProvider>
            <ContentWrapper
              detailProd={lastProduct}
            />
          </UserProvider>
        </ProductProvider>
      </div>
    </>
  );
}

export default App;
