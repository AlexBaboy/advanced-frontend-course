import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from "./ThemeContext";
import {useContext} from "react";

type useThemeResult = {
    toggleTheme: () => void,
    theme: Theme
}

export const useTheme = (): useThemeResult => {

    const {theme, setTheme} = useContext(ThemeContext)

    const toggleTheme = () => {
        const newTheme = (theme === Theme.DARK)
                                    ? Theme.LIGHT
                                    : Theme.DARK

        setTheme && setTheme(newTheme)
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }

    return <useThemeResult>{
        theme,
        toggleTheme
    }
}
