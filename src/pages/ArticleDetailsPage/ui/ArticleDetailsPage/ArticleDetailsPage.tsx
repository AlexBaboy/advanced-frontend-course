import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetailsPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";

interface ArticleDetailsPage {
    className?: string
}

const ArticleDetailsPage = (props: ArticleDetailsPage) => {

    const {className} = props
    const {t} = useTranslation()

    return (
        <div className={classNames(
            cls.ArticleDetailsPage,
            {},
            [className]
        )}>
            {/*{t('Страница не найдена')}*/}
            ArticleDetailsPage
        </div>
    );
};

export default memo(ArticleDetailsPage)