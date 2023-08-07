import {classNames} from "shared/lib/classNames/classNames";
import cls from './NotFoundPage.module.scss'
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getProfileData} from "entities/Profile/model/selectors/getProfileData/getProfileData";
import {getProfileError} from "entities/Profile/model/selectors/getProfileError/getProfileError";
import {getProfileIsLoading} from "entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading";
import {Button, ButtonTheme} from "shared/ui/Button/Button";

interface ProfileCardProps {
    className?: string
}

export const ProfileCard = ({className}: ProfileCardProps) => {

    const {t} = useTranslation('profile')
    const data = useSelector(getProfileData)
    const isLoading = useSelector(getProfileIsLoading)
    const error = useSelector(getProfileError)

    return (
        <div className={classNames(
            cls.NotFoundPage,
            {},
            [className]
        )}>
            <div>
                <Text title={t('Профиль')} />
                <Button theme={ButtonTheme.OUTLINE}>
                    {t('Редактировать')}
                </Button>
            </div>
        </div>
    );
};
