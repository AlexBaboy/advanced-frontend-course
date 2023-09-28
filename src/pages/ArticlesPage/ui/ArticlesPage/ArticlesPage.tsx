import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticlesPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";

interface ArticlesPage {
    className?: string
}

const ArticlesPage = (props: ArticlesPage) => {

    const {className} = props
    const {t} = useTranslation()

    return (
        <div className={classNames(
            cls.NotFoundPage,
            {},
            [className]
        )}>
            {/*{t('Страница не найдена')}*/}
            ArticlesPage
        </div>
    );
};

export default memo(ArticlesPage)