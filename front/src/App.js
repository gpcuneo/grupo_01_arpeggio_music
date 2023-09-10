import './App.css';
import '../src/assets/css/app.css'
import SideBar from './components/SideBar';
import ContentWrapper from './components/ContentWrapper';
import React from 'react';
import { UserProvider } from './context/user';
import { ProductProvider } from './context/product';
import { CategoryProvider } from './context/category';
import { SalesProvider } from './context/sales';


function App() {
  return (
    <>
      <div id="wrapper">
        <SideBar />
        <ProductProvider>
          <UserProvider>
            <CategoryProvider>
              <SalesProvider>
                <ContentWrapper/>
              </SalesProvider>
            </CategoryProvider>
          </UserProvider>
        </ProductProvider>
      </div>
    </>
  );
}

export default App;
