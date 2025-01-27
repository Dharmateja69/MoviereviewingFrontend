import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

let timeoutId;
export default function NotificationProvider({ children }) {
    const [notification, setNotification] = useState("");
    const [classes, setClasess] = useState("");

    const updateNotifcation = (type, value) => {
        if (timeoutId) clearTimeout(timeoutId);
        switch (type) {
            case "error":
                setClasess("bg-red-500");
                break;
            case "success":
                setClasess("bg-green-500");
                break;
            case "warning":
                setClasess("bg-orange-500");
                break;
            default:
                setClasess("bg-red-500");
        }
        setNotification(value);
        timeoutId = setTimeout(() => {
            setNotification("");
        }, 3000); // Notification disappears after 3 seconds
    };

    return (
        <NotificationContext.Provider value={{ updateNotifcation }}>
            {children}
            {notification && (
                <div className="fixed left-1/2 -translate-x-1/2 top-24">
                    <div
                        className={`bounce shadow-md shadow-gray-400 ${classes} rounded`} // Dynamic class
                    >
                        <p className="text-white px-4 py-2 font-semibold">{notification}</p>
                    </div>
                </div>
            )}
        </NotificationContext.Provider>
    );
}
