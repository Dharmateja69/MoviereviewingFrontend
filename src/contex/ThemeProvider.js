import React, { createContext } from 'react';

export const ThemeContext = createContext();


export default function ThemeProvider({children}) {
  return (
    <ThemeContext.Provider value={{theme:'just for testing'}}>

{children}

    </ThemeContext.Provider>
  )
}
