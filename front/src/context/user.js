import React, { createContext, useContext, useState, useEffect } from 'react';
import apiCall from "../api";

const urlBase = 'http://192.168.0.120:3001/api';

const getUsers = async () => apiCall({ url: `${urlBase}/users` });

const getLastuser = async (lastPage) => {
    const lastPageData = await apiCall({ url: `${urlBase}/users` });
    const userSearch = lastPageData.users.pop();
    const lastUserInfo = await apiCall({ url: `${urlBase}/users/${userSearch.userName}` });
    //console.log(lastUserInfo);
    return lastUserInfo;
}

// Crea el contexto
const UserContext = createContext("users");

// Proveedor personalizado
export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [lastUser, setLastUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Función para realizar la llamada a la API
        const getUserData = async () => {
            try {
                setIsLoading(true);
                
                const usersData = await getUsers()
                setUsers(usersData);

                const lastUserData = await getLastuser(usersData.totalPages)
                console.log(lastUserData);
                setLastUser(lastUserData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error al cargar datos:', error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        getUserData();
        const intervalId = setInterval(getUserData, 5000); // Llama a getUserData cada 5 segundos

        return () => clearInterval(intervalId); // Limpia el intervalo cuando se desmonta
    }, []);

    return (
    <UserContext.Provider value={{ users, lastUser, isLoading }}>
        {children}
    </UserContext.Provider>
    );
}

// Hook personalizado para acceder al contexto
export function useUserContext() {
    return useContext(UserContext);
}