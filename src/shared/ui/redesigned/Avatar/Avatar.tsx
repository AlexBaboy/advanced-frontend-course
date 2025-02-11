import { CSSProperties, FC, memo, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../../redesigned/AppImage';
import UserIcon from '../../../assets/icons/avatar.svg';
import { Icon } from '@/shared/ui/deprecated/Icon/Icon';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';

interface AvatarProps {
    className?: string;
    src?: string;
    alt?: string;
    size?: number;
}

export const Avatar: FC<AvatarProps> = memo((props) => {
    const { className, src, size = 100, alt } = props;

    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size,
            height: size,
        };
    }, [size]);

    const fallback = <Skeleton width={size} height={size} border="50%" />;

    const errorFallback = (
        <Icon
            Svg={UserIcon}
            width={size}
            height={size}
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
