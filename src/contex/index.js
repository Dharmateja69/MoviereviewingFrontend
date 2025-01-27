import React from "react";
import AuthProvider from "./AuthProvider";
import NotificationProvider from "./NotificationProvider";
import ThemeProvider from "./ThemeProvider";

export default function ContextProvider({ children }) {
    return (
        <AuthProvider>
            <NotificationProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </NotificationProvider>
        </AuthProvider>

    );
}
