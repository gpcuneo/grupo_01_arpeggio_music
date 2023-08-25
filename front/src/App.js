/* import logo from './logo.svg'; */
import './App.css';
import '../src/assets/css/app.css'
import SideBar from './components/SideBar';
import ContentWrapper from './components/ContentWrapper';
import React ,{useState, useEffect} from 'react';

function App() {
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
      console.log('se actualizo el componente');
    },[products])
  return (
    <>
      <div id="wrapper">
        <SideBar/>
        <ContentWrapper 
          products= {products}
          countProduct={countProducts}
        />
      </div>
    </>
  );
}

export default App;
