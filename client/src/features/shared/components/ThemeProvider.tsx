import { getItem, setItem } from '@/lib/utils/localStorage';
import { useState, createContext, useContext, useEffect } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderState = {
    theme: Theme,
    setTheme: (theme: Theme) => void; 
}

const ThemeContext = createContext<ThemeProviderState>({
    theme: 'system',
    setTheme: () => { }
});

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme: Theme,
    storageKey?: string,
}

export default function ThemeProvider({children, defaultTheme = "system",
    storageKey= 'adv-react-theme'}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        getItem(storageKey) ?? defaultTheme
    )
    
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('dark', 'light');

        if (theme === 'system') {
            const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
            setItem(storageKey, systemTheme)
            return
        }
        root.classList.add(theme)
        setItem(storageKey, theme)
    }, [theme, storageKey])


    return <ThemeContext value={{ theme, setTheme }}>{ children}</ThemeContext>
}

export const useTheme= ()=> {
    const context = useContext(ThemeContext);

    if (context === undefined) 
        throw new Error("useThem must be used within ThemeProvider");
    
    return context;
}
