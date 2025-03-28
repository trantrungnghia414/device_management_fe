import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const login = (token, email, role_name, avatar) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role_name', role_name);
        localStorage.setItem('email', email);
        // localStorage.setItem('avatar', avatar);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role_name');
        localStorage.removeItem('email');
        localStorage.removeItem('cart');
        setIsLoggedIn(false);
        window.location.href = '/';
    };

    return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
