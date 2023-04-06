import React, {FC, useMemo, useState} from 'react';
import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from "../lib/ThemeContext";

export const defaultTheme = localStorage.getItem
                            (LOCAL_STORAGE_THEME_KEY) as
                            Theme || Theme.LIGHT

type ThemeProviderProps = {
    initialTheme?: Theme
}

const ThemeProvider: FC<ThemeProviderProps> = (props) => {

    const {
        initialTheme,
        children
    } = props

    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)

    const defaultProps = useMemo(() => ({
            theme,
            setTheme
    }), [theme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
