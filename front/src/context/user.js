import React, { createContext, useContext, useState, useEffect } from 'react';
import apiCall from "../api";

// Crea el contexto
const UserContext = createContext("users");

// Proveedor personalizado
export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Función para realizar la llamada a la API
        const getUsers = async () => {
            try {
                setIsLoading(true);
                const usersResult = await apiCall({
                    url: "http://192.168.0.120:3001/api/users",
                });
                setUsers(usersResult);
                setIsLoading(false);
            } catch (error) {
                console.error('Error al cargar datos:', error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        getUsers();
        const intervalId = setInterval(getUsers, 5000); // Llama a getUsers cada 5 segundos

        return () => clearInterval(intervalId); // Limpia el intervalo cuando se desmonta
    }, []);

    return (
    <UserContext.Provider value={{ users, isLoading }}>
        {children}
    </UserContext.Provider>
    );
}

// Hook personalizado para acceder al contexto
export function useUserContext() {
    return useContext(UserContext);
}