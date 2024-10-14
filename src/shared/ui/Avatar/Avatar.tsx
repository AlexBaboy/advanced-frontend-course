import {
    CSSProperties, FC, memo, useMemo,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import UserIcon from '../../assets/icons/avatar.svg';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface AvatarProps {
    className?: string
    src?: string
    alt?: string
    size?: number
    fallbackInverted?: boolean
}

export const Avatar: FC<AvatarProps> = memo((props) => {
    const {
        className,
        src,
        size = 100,
        alt,
        fallbackInverted,
    } = props;

    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size,
            height: size,
        };
    }, [size]);

    const fallback = (
        <Skeleton
            width={size}
            height={size}
            border="50%"
        />
    );

    const errorFallback = (
        <Icon
            Svg={UserIcon}
            width={size}
            height={size}
            inverted={fallbackInverted}
        />
    );

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            src={src}
            alt={alt}
            style={styles}
            className={classNames(cls.Avatar, mods, [className])}
        />
    );
});
