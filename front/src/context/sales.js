import React, { createContext, useContext, useState, useEffect } from 'react';
import apiCall from "../api";

const domain = process.env.REACT_APP_BACK_NAME
const port = process.env.REACT_APP_BACK_PORT
const urlBase = `http://${domain}:${port}/api/sales`;
const timeCallAPI = 10000;

//const getSales = async () => apiCall({ url: `${urlBase}/sales` });
const getSales = async () => apiCall({ url: urlBase });


// Crea el contexto
const SalesContext = createContext("sales");

// Proveedor personalizado
export function SalesProvider({ children }) {
    const [sales, setSales] = useState([]);
    const [loadingSales, setIsLoading] = useState(true);

    useEffect(() => {
        // Función para realizar la llamada a la API
        const getSalesData = async () => {
            try {
                setIsLoading(true);
                
                const salesData = await getSales()
                setSales(salesData);

                setIsLoading(false);
            } catch (error) {
                console.error('Error al cargar datos:', error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        getSalesData();
        const intervalId = setInterval(getSalesData, timeCallAPI); // Llama a getUserData cada 5 segundos

        return () => clearInterval(intervalId); // Limpia el intervalo cuando se desmonta
    }, []);

    return (
    <SalesContext.Provider value={{ sales, loadingSales }}>
        {children}
    </SalesContext.Provider>
    );
}

// Hook personalizado para acceder al contexto
export function useSalesContext() {
    return useContext(SalesContext);
}