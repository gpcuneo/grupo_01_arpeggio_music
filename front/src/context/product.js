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

const next =async (page,totalPages)=>{
  let nextPage = page === totalPages? totalPages:page + 1;
  const productsListByPage = await apiCall({url:`${urlBase}/products?page=${nextPage}`});
  return productsListByPage;
}
const back = async (page)=>{
  let pageback= page > 0 ? page-1 : 1;
  const productsListByPage = await apiCall({url:`${urlBase}/products?page=${pageback}`});
  return productsListByPage;
}
// Crea el contexto
const ProductContext=createContext('products');

//Proveedor personalizado
export function ProductProvider({children}) {
    const [products, setProducts]=useState([]);
    const [lastProduct, setLastProduct]=useState([]);
    const [isLoadingPro, setIsLoadingPro]=useState(true);
    const [productsFirst, setProductsFirst]= useState([])
    const [productPage, setProductPage]=useState(1);
    useEffect(()=>{
      //Función para realizar la llamada a la API
      const getProductList = async()=>{
        const ProductListData= await getProducts();
        setProductsFirst(ProductListData)
      } 
      const getProductData= async()=>{
        try {
          //Indica que se estan cargando datos
          setIsLoadingPro(true)
          //Le setea la api de Productos
          const productsData= await getProducts()
          setProducts(productsData);
          //Le setea el último producto creado en la base de datos 
          let lastProductData = await getLastProduct(productsData.totalPages);
          setLastProduct(lastProductData);
          const id = lastProductData.id;
          lastProductData.img = lastProductData.image['1'];
          lastProductData.detail = `http://${domain}:${port}/products/${id}` 
          
          //Indica que termino de cargar todos los datos
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
      getProductList();      
      
      return ()=> clearInterval(intervalId);//Limpia el intervalo cuando se desmonta el componente
    },[])
  return (
    <ProductContext.Provider value={{products,lastProduct,isLoadingPro, next,back,productsFirst,productPage,setProductPage,setProductsFirst}}>
      {children}
    </ProductContext.Provider>
  );
}

//Hook personalizado para acceder al contexto
export function useProductContext(){
  return useContext(ProductContext)
}