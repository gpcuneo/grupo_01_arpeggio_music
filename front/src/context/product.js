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
// Crea el contexto
const ProductContext=createContext('products');

//Proveedor personalizado
export function ProductProvider({children}) {
    const [products, setProducts]=useState([]);
    const [lastProduct, setLastProduct]=useState([]);
    const [isLoadingPro, setIsLoadingPro]=useState(true);

    useEffect(()=>{
      //Función para realizar la llamada a la API
      const getProductData= async()=>{
        try {
          setIsLoadingPro(true)
          const productsData= await getProducts()
          setProducts(productsData);
          let lastProductData = await getLastProduct(productsData.totalPages);
          setLastProduct(lastProductData);
          lastProductData.img = lastProductData.image['1'];
          
          console.log(' ------------------ lastProductData')
          console.log(lastProductData)
          setIsLoadingPro(false);
        } catch (error) {
          console.error(`Error al cargar datos:`, error);
          setIsLoadingPro(false)
        }finally{
          setIsLoadingPro(false)
        }
      }
      getProductData();
      const intervalId= setInterval(getProductData,5000); //Llama a getProductData(llama a la api cada 5 segundos)
      
      return ()=> clearInterval(intervalId);//Limpia el intervalo cuando se desmonta el componente
    },[])
    
  return (
    <ProductContext.Provider value={{products,lastProduct,isLoadingPro}}>
      {children}
    </ProductContext.Provider>
  );
}

//Hook personalizado para acceder al contexto
export function useProductContext(){
  return useContext(ProductContext)
}