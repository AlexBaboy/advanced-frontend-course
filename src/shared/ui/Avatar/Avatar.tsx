import {classNames, Mods} from '@/shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'
import {CSSProperties, FC, memo, useMemo} from 'react'


interface AvatarProps {
    className?: string
    src?: string
    alt?: string
    size?: number
}

export const Avatar: FC<AvatarProps> = memo((props) => {

    const {
        className,
        src,
        size,
        alt
    } = props

    const mods: Mods = {}

    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size || 100,
            height: size || 100
        }
    }, [size])

    return (
        <img
            src={src}
            alt={alt}
            style={styles}
            className={classNames(cls.Avatar, mods, [className])}
        />
    )
})
