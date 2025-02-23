import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ThemeIcon from '@/shared/assets/icons/theme-light.svg';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import cls from './ThemeSwitcher.module.scss';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import {ToggleFeatures} from "@/shared/lib/features";
import {Icon} from "@/shared/ui/redesigned/Icon/Icon";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(
                saveJsonSettings({
                    theme: newTheme,
                }),
            );
        });
    }, [toggleTheme]);

    return (
        <ToggleFeatures on={<Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />} off={<Button
            theme={ButtonTheme.CLEAR}
            onClick={onToggleHandler}
            className={classNames(cls.ThemeSwitcher, {}, [className])}
        >
            <IconDeprecated Svg={ThemeIcon} width={40} height={40} inverted />
        </Button>} feature={'isAppRedesigned'} />

    );
});
