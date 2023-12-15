import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss'
import {useTranslation} from "react-i18next";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
    fetchProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadOnly,
    getProfileValidateErrors,
    profileActions,
    ProfileCard,
    profileReducer, ValidateProfileError
} from "entities/Profile";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useCallback, useEffect} from "react";
import {Loader} from "shared/ui/Loader/Loader";
import ProfilePageHeader from "./ProfilePageHeader/ProfilePageHeader";
import {useSelector} from "react-redux";
import {Currency} from "entities/Currency";
import {Country} from "entities/Country";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {useParams} from "react-router-dom";
import {Page} from "widgets/Page/Page";

const reducers: ReducersList = {
    profile: profileReducer
}

interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({className}: ProfilePageProps) => {

    const {t} = useTranslation('profile')

    const dispatch = useAppDispatch()

    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadOnly);
    const validateErrors = useSelector(getProfileValidateErrors);
    const {id} = useParams<{id: string}>()

    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Укажите страну'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    }

    useInitialEffect(() => {
        id && dispatch(fetchProfileData(id))
    })

    const onChangeFirstName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({first: value || ''}))
    }, [])

    const onChangeLastName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({lastname: value || ''}))
    }, [])

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({city: value || ''}))
    }, [])

    const onChangeAge = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({age: Number(value || 0)}))
    }, [])

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({username: value || ''}))
    }, [])

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({avatar: value || ''}))
    }, [])

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({currency}))
    }, [])

    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({country}))
    }, [])

    if (isLoading) {
        return (
            <div className={classNames(
                cls.ProfilePage,
                {},
                [className]
            )}>
                <Loader />
            </div>
        )
    }

    // @ts-ignore
    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <Page className={classNames(
                        cls.ProfilePage,
                        {},
                    [className, cls.loading]
                )}>
                <ProfilePageHeader />

                {validateErrors?.length && validateErrors.map((err) => (
                    <Text
                        key={err}
                        theme={TextTheme.ERROR}
                        text={validateErrorTranslates[err]}
                    />
                ))}

                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                    onChangeFirstName={onChangeFirstName}
                    onChangeLastName={onChangeLastName}
                    onChangeCity={onChangeCity}
                    onChangeAge={onChangeAge}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default ProfilePage