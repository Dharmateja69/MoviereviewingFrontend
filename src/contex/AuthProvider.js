import React, { createContext, useEffect, useState } from "react";
import { getIsAuth, signInUser } from "../api/auth";

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
        try {
            const { error, user } = await signInUser({ email, password });

            // Handle API error
            if (error) {
                setauthInfo({
                    ...authInfo,
                    isPending: false,
                    error,
                });
                return;
            }

            // Set user profile upon success
            setauthInfo({
                profile: user, // Correctly assign the user object
                isLoggedIn: true,
                isPending: false,
                error: "",
            });

            localStorage.setItem("auth-token", user.token);
        } catch (err) {
            setauthInfo({
                ...authInfo,
                isPending: false,
                error: "An unexpected error occurred.",
            });
        }
    };

    const isAuth = async () => {
        const token = localStorage.getItem('auth-token')
        if (!token) return;
        setauthInfo({
            ...authInfo,
            isPending: true
        })
        const { error, user } = await getIsAuth(token)

        if (error) return setauthInfo({
            ...authInfo,
            isPending: false, error
        })
        setauthInfo({
            profile: user, // Correctly assign the user object
            isLoggedIn: true,
            isPending: false,
            error: "",
        });

    }

    const handlelogout = () => {
        localStorage.removeItem('auth-token')
        setauthInfo({ ...defaultAuthInfo })
    }
    useEffect(() => {
        isAuth()
    }, [])
    return (
        <AuthContext.Provider
            value={{ authInfo, handleLogin, isAuth, handlelogout }}
        >
            {children}
        </AuthContext.Provider>
    );
}
