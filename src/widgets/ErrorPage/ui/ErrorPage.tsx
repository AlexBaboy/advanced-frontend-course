import {classNames} from "shared/lib/classNames/classNames";
import {useTranslation} from "react-i18next";
import cls from './ErrorPage.module.scss'

interface ErrorPageProps {
    className?: string
}

export const ErrorPage = ({className}: ErrorPageProps) => {
    const {t} = useTranslation()

    const reloadPage = () => {
        location.reload()
    }

    return (
        <div className={classNames(
                    cls.ErrorPage,
                    {},
                [className]
            )}>
            <p>
                {t('Произошла непредвиденная ошибка')}
            </p>
            <button onClick={reloadPage} className={'reload'}>
                {t('Обновить страницу')}
            </button>
        </div>
    );
};
