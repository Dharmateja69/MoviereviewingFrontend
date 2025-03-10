import React, { createContext, useEffect, useState } from "react";
import { getIsAuth, signInUser } from "../api/auth";
import { useNotification } from "../hooks";

export const AuthContext = createContext();

const defaultAuthInfo = {
    profile: null,
    isLoggedIn: false,
    isPending: false,
    error: "",
};

export default function AuthProvider({ children }) {
    const [authInfo, setauthInfo] = useState({ ...defaultAuthInfo });
    const { updateNotifcation } = useNotification();

    const handleLogin = async (email, password) => {
        setauthInfo((prev) => ({ ...prev, isPending: true }));
        try {
            const { error, user } = await signInUser({ email, password });

            // Handle API error
            if (error) {
                console.log(error)
                updateNotifcation("error", error.message);
                return setauthInfo((prev) => ({
                    ...prev,
                    isPending: false,
                    error: error.message,
                }));

            }

            // Set user profile upon success
            setauthInfo({
                profile: user,
                isLoggedIn: true,
                isPending: false,
                error: "",
            });

            localStorage.setItem("auth-token", user.token);
        } catch (err) {
            setauthInfo((prev) => ({
                ...prev,
                isPending: false,
                error: "An unexpected error occurred.",
            }));
        }
    };

    const isAuth = async () => {
        const token = localStorage.getItem("auth-token");
        if (!token) return;

        setauthInfo((prev) => ({ ...prev, isPending: true }));

        const { error, user } = await getIsAuth(token);

        if (error) {
            updateNotifcation("error", error);
            return setauthInfo((prev) => ({
                ...prev,
                isPending: false,
                error,
            }));
        }

        setauthInfo({
            profile: user,
            isLoggedIn: true,
            isPending: false,
            error: "",
        });
    };
    const handlelogout = () => {
        localStorage.removeItem("auth-token");
        setauthInfo({ ...defaultAuthInfo });
    };

    useEffect(() => {
        isAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{ authInfo, handleLogin, handlelogout, isAuth }}
        >
            {children}
        </AuthContext.Provider>
    );
}
