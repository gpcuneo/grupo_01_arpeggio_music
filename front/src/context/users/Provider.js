import UserContext from "./index";
import apiCall from "../../api";
import { useState } from "react";

export default function UserProvider({ children }) {
    const [users, setUsers] = useState([]);
    
    const getUsers = async () => {
    try {
        setIsLoading(true);
        setErrorMessage("");
        setHasError(false);
        const usersResult = await apiCall({
            url: "http://localhost:3001/api/users",
        });
        setUsers(usersResult.results);
    } catch (error) {
        console.log(error);
    } finally {
        setIsLoading(false);
    }
};

return (
    <UserContext.Provider
        value={{
            getUsers,
            users,
        }}
    >
    {children}
    </UserContext.Provider>
    );
}
