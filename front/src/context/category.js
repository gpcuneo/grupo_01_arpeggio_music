import React, { createContext, useContext, useState, useEffect } from 'react';
import apiCall from "../api";

const domain = process.env.REACT_APP_BACK_NAME
const port = process.env.REACT_APP_BACK_PORT

const urlBase = `http://${domain}:${port}/api`;

const getCategories = async () => apiCall({ url: `${urlBase}/category` });

const getCountProductByCategories = async () => apiCall({ url: `${urlBase}/category/products` });

const getLastCategory = async (lastPage) => {
    const lastPageData = await apiCall({ url: `${urlBase}/category?page=${lastPage}` });
    const categorySearch = lastPageData.categories.pop();
    const lastCategoryInfo = await apiCall({ url: `${urlBase}/category/${categorySearch.id}` });
    console.log(lastCategoryInfo);
    return lastCategoryInfo;
}

// Crea el contexto
const CategoryContext = createContext("users");

// Proveedor personalizado
export function CategoryProvider({ children }) {
    const [category, setCategory] = useState([]);
    const [lastCategory, setLastCategory] = useState([]);
    const [countProductsByCategory, setCountProductsByCategory] = useState([]);
    const [loadingCategories, setIsLoading] = useState(true);

    useEffect(() => {
        // Función para realizar la llamada a la API
        const getCategoriesData = async () => {
            try {
                setIsLoading(true);
                
                const categoryData = await getCategories();
                setCategory(categoryData);

                const lastUserData = await getLastCategory(categoryData.totalPages)
                setLastCategory(lastUserData);

                const productsByCategory = await getCountProductByCategories();
                setCountProductsByCategory(productsByCategory)
                
                setIsLoading(false);
            } catch (error) {
                console.error('Error al obtener daros de las categorias:', error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        getCategoriesData();
        const intervalId = setInterval(getCategoriesData, 5000); // Llama a getCategoriesData cada 5 segundos

        return () => clearInterval(intervalId); // Limpia el intervalo cuando se desmonta
    }, []);

    return (
    <CategoryContext.Provider value={{ category, lastCategory, countProductsByCategory, loadingCategories }}>
        {children}
    </CategoryContext.Provider>
    );
}

// Hook personalizado para acceder al contexto
export function useCategoryContext() {
    return useContext(CategoryContext);
}