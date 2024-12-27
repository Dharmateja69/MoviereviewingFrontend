import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();
const defaultTheme = "light";
const darkTheme = "dark";

export default function ThemeProvider({ children }) {
  const toggleTheme = () => {
    const oldtheme = getTheme();
    const newTheme = oldtheme === defaultTheme ? darkTheme : defaultTheme;

    updateTheme(newTheme, oldtheme);
  };

  useEffect(() => {
    const theme = getTheme();

    if (!theme) updateTheme(defaultTheme);
    updateTheme(theme);
  }, []);
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const getTheme = () => {
  return localStorage.getItem("theme");
};

const updateTheme = (theme, themetoremove) => {
  if (themetoremove) document.documentElement.classList.remove(themetoremove);

  document.documentElement.classList.add(theme);
  // console.log(document.documentElement);
  localStorage.setItem("theme", theme);
};
