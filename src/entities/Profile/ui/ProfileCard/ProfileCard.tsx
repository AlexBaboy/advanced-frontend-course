import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from './ProfileCard.module.scss'
import {useTranslation} from "react-i18next";
import {Text, TextAlign, TextTheme} from "shared/ui/Text/Text";
import {Input} from "shared/ui/Input/Input";
import {Profile} from "../../model/types/profile";
import {Loader} from "shared/ui/Loader/Loader";
import {memo} from "react";
import {Avatar} from "shared/ui/Avatar/Avatar";
import {Currency} from "entities/Currency";
import {CurrencySelect} from "entities/Currency";

import {Country, CountrySelect} from "entities/Country";

interface ProfileCardProps {
    className?: string
    data?: Profile
    isLoading?: boolean
    error?: string
    readonly?: boolean
    onChangeFirstName?: (value?: string) => void
    onChangeLastName?: (value?: string) => void
    onChangeAge?: (value?: string) => void
    onChangeCity?: (value?: string) => void,
    onChangeAvatar?: (value?: string) => void,
    onChangeUsername?: (value?: string) => void,
    onChangeCurrency?: (currency: Currency) => void,
    onChangeCountry?: (currency: Country) => void,
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
        onChangeAge,
        onChangeAvatar,
        onChangeUsername,
        onChangeCurrency,
        onChangeCountry
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

    const mods: Mods = {
        [cls.editing]: !readonly
    }

    return (
        <div className={classNames(
            cls.ProfileCard,
            mods,
            [className]
        )}>
            <div className={cls.data}>
                {data?.avatar && (
                    <div className={cls.avatarWrapper}>
                        <Avatar src={data?.avatar}  alt='avatar'/>
                    </div>
                )}
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
                <Input
                    value={data?.username}
                    placeholder={t('Имя пользователя')}
                    className={cls.input}
                    onChange={onChangeUsername}
                    readOnly={readonly}
                />
                <Input
                    value={data?.avatar}
                    placeholder={t('Аватар')}
                    className={cls.input}
                    onChange={onChangeAvatar}
                    readOnly={readonly}
                />
                <CurrencySelect
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readOnly={readonly}
                    className={cls.input}
                />
                <CountrySelect
                    value={data?.country}
                    onChange={onChangeCountry}
                    readOnly={readonly}
                    className={cls.input}
                />
            </div>
        </div>
    );
})
