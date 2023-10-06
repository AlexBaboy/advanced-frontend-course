import React, {memo, ReactNode} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './Code.module.scss'
import {Button} from "shared/ui/Button/Button";
import {useTranslation} from "react-i18next";

interface CodeProps {
    className?: string
    children: ReactNode
}

export const Code = memo((props: CodeProps) => {

    const {
        className,
        children,
    } = props

    /*const {t} = useTranslation()*/

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button className={cls.copyBtn}>Копировать</Button>
            <code>
                {children}
            </code>
        </pre>
    );
});
