import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleCodeBlockComponent.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";

interface ArticleCodeBlockComponentProps {
    className?: string
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {

    const {className} = props

    const {t} = useTranslation()

    return (
        <div className={classNames(
            cls.NotFoundPage,
            {},
            [className]
        )}>
            ArticleCodeBlockComponent
        </div>
    );
});
