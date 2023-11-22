import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from './Page.module.scss'
import React, {memo, ReactNode} from "react";

interface PageProps {
    className?: string
    children: ReactNode
}

export const Page = memo((props: PageProps) => {

    const {
        className,
        children
    } = props

    return (
        <div className={classNames(
            cls.Page,
            {},
            [className])}>
            {children}
        </div>
    );
});
