import {classNames} from "shared/lib/classNames/classNames";
import cls from './Select.module.scss'
import {CSSProperties, memo} from "react";

interface SkeletonProps {
    className?: string
    height?: string | number
    width?: string | number
    border?: string
}

export const Skeleton = memo((props: SkeletonProps) => {

    const {
        className,
        height,
        width,
        border,
    } = props

    const styles: CSSProperties = {
        height,
        width,
        borderRadius: border
    }

    return (
        <div className={classNames(cls.Wrapper, {}, [className])}
            style={styles}
        />
    )
});