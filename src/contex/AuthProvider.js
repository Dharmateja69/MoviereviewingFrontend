import React, { createContext, useState } from "react";
import { signInUser } from "../api/auth";

export const AuthContext = createContext();

const defaultAuthInfo = {
    profile: null,
    isLoggedIn: false,
    isPending: false,
    error: "",
};

export default function AuthProvider({ children }) {
    const [authInfo, setauthInfo] = useState({ ...defaultAuthInfo });

    const handleLogin = async (email, password) => {
        setauthInfo({ ...authInfo, isPending: true });
        const { error, user } = await signInUser({ email, password });
        if (error) {
            return setauthInfo({ ...authInfo, isPending: false, error });
        }
        setauthInfo({
            profile: { ...authInfo },
            isLoggedIn: true,
            isPending: false,
            error: " ",
        });

        localStorage.setItem("auth-token", user.token);
    };
    //handleLogout, isAuth
    return (
        <AuthContext.Provider
            value={{ authInfo, handleLogin }}
        >
            {children}
        </AuthContext.Provider>
    );
}
