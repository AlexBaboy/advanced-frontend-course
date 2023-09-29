import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetails.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";

interface ArticleDetailsProps {
    className?: string
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {

    const {className} = props

    const {t} = useTranslation()

    return (
        <div className={classNames(
            cls.NotFoundPage,
            {},
            [className]
        )}>
            ArticleDetails
        </div>
    );
});
