import { createContext, useState, useEffect } from "react";


//creates a “box” that stores my auth data:
export const AuthContext = createContext();


//this component will wrap my entire app & children is whatever components are inside the provider.

export function AuthProvider({ children }) {

    //ensures the user stays logged in even after page refresh:
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

    // keep localStorage synced
    useEffect(() => {
        if (token) localStorage.setItem("token", token);
        else localStorage.removeItem("token");

        if (userId) localStorage.setItem("userId", userId);
        else localStorage.removeItem("userId");
    }, [token, userId]);


    // LoginForm will call this instead of writing directly into localStorage.
    //then React will update the global state & navbar & profile will immediately rerender!

    const login = (token, userId) => {
        setToken(token);
        setUserId(userId);
    };

    //this clears the global state:
    const logout = () => {
        setToken(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ token, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}