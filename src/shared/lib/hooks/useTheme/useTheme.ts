import { useContext } from 'react';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';

type useThemeResult = {
    toggleTheme: (saveAction?: (theme: Theme) => void) => void;
    theme: Theme;
};

export const useTheme = (): useThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = (saveAction?: (theme: Theme) => void) => {
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
        saveAction?.(newTheme);
    };

    return <useThemeResult>{
        theme,
        toggleTheme,
    };
};
