import { createContext, useEffect, useState } from "react";

type ThemeContext = {
    theme: string;
    toggleTheme: () => void;
} | undefined;

export const ThemeContext = createContext<ThemeContext>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // Valor inicial

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};