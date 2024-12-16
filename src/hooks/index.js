import { useContext } from "react";
import { ThemeContext } from "../contex/ThemeProvider";


export const useTheme =()=>
    useContext(ThemeContext);