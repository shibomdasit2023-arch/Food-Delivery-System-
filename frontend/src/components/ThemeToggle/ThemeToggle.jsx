import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./ThemeToggle.css";

const ThemeToggle = () => {

    const { darkMode, setDarkMode } = useContext(ThemeContext);

    return (

        <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
        >

            {darkMode ? "☀ Light" : "🌙 Dark"}

        </button>

    );

};

export default ThemeToggle;