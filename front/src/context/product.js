import React,{createContext,useEffect,useState,useContext} from "react";
import apiCall from "../api";

const domain = process.env.REACT_APP_BACK_NAME;
const port = process.env.REACT_APP_BACK_PORT;

const urlBase= `http://${domain}:${port}/api`;

const getProducts= async ()=> apiCall({url:`${urlBase}/products`});

const getLastProduct= async(lastPage)=>{
    const lastPageProd= await apiCall({url:`${urlBase}/products?page=${lastPage}`});
    const productSearch= lastPageProd.products.pop();
    const lastProductDetail= await apiCall({url:`${urlBase}/products/${productSearch.id}`})
    const lastProductInfo= lastProductDetail.product;
    return lastProductInfo;
}

const ProductContext=createContext('products');


export function ProductProvider({children}) {
    const [products, setProducts]=useState([]);
    const [lastProduct, setLastProduct]=useState([]);
    const [isLoadingPro, setIsLoadingPro]=useState(true);

    useEffect(()=>{
      const getProductData= async()=>{
        try {
          setIsLoadingPro(true)
          const productsData= await getProducts()
          setProducts(productsData);
          const lastProductData = await getLastProduct(productsData.totalPages);
          setLastProduct(lastProductData);
          setIsLoadingPro(false);
        } catch (error) {
          console.error(`Error al cargar datos:`, error);
          setIsLoadingPro(false)
        }finally{
          setIsLoadingPro(false)
        }
      }
      getProductData();
      /* const intervalId= setInterval(getProductData,10000);
      
      return ()=> clearInterval(intervalId); */
    },[])
    
  return (
    <ProductContext.Provider value={{products,lastProduct,isLoadingPro}}>
      {children}
    </ProductContext.Provider>
  );
}
export function useProductContext(){
  return useContext(ProductContext)
}