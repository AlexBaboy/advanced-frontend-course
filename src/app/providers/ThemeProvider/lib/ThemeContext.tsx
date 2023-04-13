import React, {createContext} from 'react';

export enum Theme {
    LIGHT = 'app_light_theme',
    DARK = 'app_dark_theme'
}

type ThemeContextProps = {
    theme?: Theme,
    setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({

})

export const LOCAL_STORAGE_THEME_KEY = 'theme'
