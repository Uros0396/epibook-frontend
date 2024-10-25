import { createContext, useEffect, useState } from "react";

export const DarkContext = createContext()

export const DarkContextProvider = ({ children }) => {

    const [isDarkMode, setIsDarkMode] = useState(false)
    const toggleDarkMode = () => {
        setIsDarkMode(previews => !previews) 
    }
    useEffect(() => {
      document.body.className = isDarkMode ? "dark" : "light"
    },[])
    return (
      <DarkContext.Provider value={{isDarkMode, toggleDarkMode}}>
        {children}
      </DarkContext.Provider>
    )

}