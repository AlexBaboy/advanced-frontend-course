import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfileCard.module.scss'
import {useTranslation} from "react-i18next";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {Input} from "shared/ui/Input/Input";
import {Profile} from "../../model/types/profile";
import {Loader} from "shared/ui/Loader/Loader";

interface ProfileCardProps {
    className?: string
    data?: Profile
    isLoading?: boolean
    error?: string
}

export const ProfileCard = (props: ProfileCardProps) => {

    const {
        className,
        data,
        isLoading,
        error
    } = props

    const {t} = useTranslation('profile')

    if (error) {
        return (
            <div className={classNames(
                cls.ProfileCard,
                {},
                [className, cls.error]
            )}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Ошибка загрузки профиля')}
                    text={t('Обновите страницу')}
                />
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className={classNames(
                cls.ProfileCard,
                {},
                [className, cls.loading]
            )}>
                <Loader />
            </div>
        )
    }

    return (
        <div className={classNames(
            cls.ProfileCard,
            {},
            [className]
        )}>
            <div className={cls.header}>
                <Text title={t('Профиль')} />
                <Button
                    theme={ButtonTheme.OUTLINE}
                    className={cls.editBtn}
                >
                    {t('Редактировать')}
                </Button>
            </div>
            <div className={cls.data}>
                <Input
                    value={data?.first}
                    placeholder={t('Имя')}
                    className={cls.input}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Фамилия')}
                    className={cls.input}
                />
            </div>
        </div>
    );
};
