import React, { createContext, useContext, useState, useEffect } from 'react';
import apiCall from "../api";

const domain = process.env.REACT_APP_BACK_NAME
const port = process.env.REACT_APP_BACK_PORT

const urlBase = `http://${domain}:${port}/api`;

const getUsers = async () => apiCall({ url: `${urlBase}/users` });

const getLastuser = async (lastPage) => {
    const lastPageData = await apiCall({ url: `${urlBase}/users?page=${lastPage}` });
    const userSearch = lastPageData.users.pop();
    const lastUserInfo = await apiCall({ url: `${urlBase}/users/${userSearch.userName}` });
    return lastUserInfo;
}

// Crea el contexto
const UserContext = createContext("users");

// Proveedor personalizado
export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [lastUser, setLastUser] = useState([]);
    const [loadingUser, setIsLoading] = useState(true);

    useEffect(() => {
        // Función para realizar la llamada a la API
        const getUserData = async () => {
            try {
                setIsLoading(true);
                
                const usersData = await getUsers()
                setUsers(usersData);

                let lastUserData = await getLastuser(usersData.totalPages)
                
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
    <UserContext.Provider value={{ users, lastUser, loadingUser }}>
        {children}
    </UserContext.Provider>
    );
}

// Hook personalizado para acceder al contexto
export function useUserContext() {
    return useContext(UserContext);
}