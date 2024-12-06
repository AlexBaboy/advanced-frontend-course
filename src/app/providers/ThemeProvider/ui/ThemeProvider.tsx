import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { useJsonSettings } from '@/entities/User/model/selectors/getJsonSettings/getJsonSettings';

type ThemeProviderProps = {
    initialTheme?: Theme;
    children: ReactNode;
};

const ThemeProvider = (props: ThemeProviderProps) => {
    const { initialTheme, children } = props;

    const { theme: defaultTheme = Theme.LIGHT } = useJsonSettings();

    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);
    const [isThemeInited, setThemeInited] = useState(false);

    useEffect(() => {
        if (!isThemeInited) return;

        setTheme(defaultTheme);
        setThemeInited(true);
    }, [defaultTheme, isThemeInited]);

    useEffect(() => {
        document.body.className = theme;
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
