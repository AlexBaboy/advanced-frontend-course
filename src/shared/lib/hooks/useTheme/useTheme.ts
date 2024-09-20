import { useContext } from 'react';
import { Theme } from '@/app/providers/ThemeProvider';
import {LOCAL_STORAGE_THEME_KEY, ThemeContext} from '@/app/providers/ThemeProvider/lib/ThemeContext';

type useThemeResult = {
    toggleTheme: () => void,
    theme: Theme
}

export const useTheme = (): useThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        let newTheme: Theme = Theme.LIGHT;

        switch (theme) {
        case Theme.DARK:
            newTheme = Theme.LIGHT;
            break;
        case Theme.LIGHT:
            newTheme = Theme.ORANGE;
            break;
        case Theme.ORANGE:
            newTheme = Theme.DARK;
            break;
        default:
            newTheme = Theme.LIGHT;
        }

        setTheme && setTheme(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return <useThemeResult>{
        theme,
        toggleTheme,
    };
};
