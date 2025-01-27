import { useContext } from "react";
import { AuthContext } from "../contex/AuthProvider";
import { NotificationContext } from "../contex/NotificationProvider";
import { ThemeContext } from "../contex/ThemeProvider";


export const useTheme = () => useContext(ThemeContext);

export const useNotification = () => useContext(NotificationContext);

export const useAuth = () => useContext(AuthContext)