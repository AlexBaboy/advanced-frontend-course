import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfileCard.module.scss'
import {useTranslation} from "react-i18next";
import {Text, TextAlign, TextTheme} from "shared/ui/Text/Text";
import {Input} from "shared/ui/Input/Input";
import {Profile} from "../../model/types/profile";
import {Loader} from "shared/ui/Loader/Loader";
import {memo} from "react";

interface ProfileCardProps {
    className?: string
    data?: Profile
    isLoading?: boolean
    error?: string
    readonly?: boolean
    onChangeFirstName: (value?: string) => void
    onChangeLastName: (value?: string) => void
    onChangeAge: (value?: string) => void
    onChangeCity: (value?: string) => void,
}

export const ProfileCard = memo((props: ProfileCardProps) => {

    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstName,
        onChangeLastName,
        onChangeCity,
        onChangeAge
    } = props

    const {t} = useTranslation('profile')

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
                    align={TextAlign.CENTER}
                />
            </div>
        )
    }

    return (
        <div className={classNames(
            cls.ProfileCard,
            {},
            [className]
        )}>
            <div className={cls.data}>
                <Input
                    value={data?.first}
                    placeholder={t('Имя')}
                    className={cls.input}
                    onChange={onChangeFirstName}
                    readOnly={readonly}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Фамилия')}
                    className={cls.input}
                    onChange={onChangeLastName}
                    readOnly={readonly}
                />
                <Input
                    value={data?.age}
                    placeholder={t('Возраст')}
                    className={cls.input}
                    onChange={onChangeAge}
                    readOnly={readonly}
                />
                <Input
                    value={data?.city}
                    placeholder={t('Город')}
                    className={cls.input}
                    onChange={onChangeCity}
                    readOnly={readonly}
                />
            </div>
        </div>
    );
})
