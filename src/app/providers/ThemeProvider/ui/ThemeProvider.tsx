import React, {
    FC, ReactNode, useEffect, useMemo, useState,
} from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

export const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as
                            Theme || Theme.LIGHT

type ThemeProviderProps = {
    initialTheme?: Theme,
    children: ReactNode
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const {
        initialTheme,
        children,
    } = props

    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)

    useEffect(() => {
        document.body.className = theme
    }, [theme])

    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
