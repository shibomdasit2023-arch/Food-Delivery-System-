import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {

    const [darkMode, setDarkMode] = useState(() => {

        const savedTheme = localStorage.getItem("adminDarkMode");

        return savedTheme === "true";

    });

    useEffect(() => {

        if (darkMode) {

            document.body.classList.add("dark");

        } else {

            document.body.classList.remove("dark");

        }

        localStorage.setItem("adminDarkMode", darkMode);

    }, [darkMode]);

    return (

        <ThemeContext.Provider
            value={{
                darkMode,
                setDarkMode
            }}
        >

            {children}

        </ThemeContext.Provider>

    );

};

export default ThemeProvider;