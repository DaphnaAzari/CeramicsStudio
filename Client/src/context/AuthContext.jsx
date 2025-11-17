import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    // Keep localStorage synced
    useEffect(() => {
        if (token) localStorage.setItem("token", token);
        else localStorage.removeItem("token");

        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
    }, [token, user]);

    // Only two values must be stored: token + user object
    const login = (token, userObject) => {
        setToken(token);
        setUser(userObject);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
