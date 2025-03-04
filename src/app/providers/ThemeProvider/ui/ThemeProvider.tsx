import React, {
    Component,
    ComponentType,
    ReactNode,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { useJsonSettings } from '@/entities/User/model/selectors/getJsonSettings/getJsonSettings';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';

type ThemeProviderProps = {
    initialTheme?: Theme;
    children: ReactNode;
};

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

const ThemeProvider = (props: ThemeProviderProps) => {
    const { initialTheme, children } = props;

    const { theme: defaultTheme } = useJsonSettings();

    const [theme, setTheme] = useState<Theme>(
        initialTheme || fallbackTheme || Theme.LIGHT,
    );
    const [isThemeInited, setThemeInited] = useState(false);

    useEffect(() => {
        if (!isThemeInited && initialTheme) {
            setTheme(initialTheme);
            setThemeInited(true);
        }
    }, [initialTheme, isThemeInited]);

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    }, [theme]);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
