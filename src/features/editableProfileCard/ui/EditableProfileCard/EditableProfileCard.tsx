import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './EditableProfileCard.module.scss';
import {memo, useCallback} from 'react';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {useSelector} from 'react-redux';

import {useParams} from 'react-router-dom';
import {useInitialEffect} from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import {Currency} from 'entities/Currency';
import {Country} from 'entities/Country';
import {Text, TextTheme} from 'shared/ui/Text/Text';
import {getProfileForm} from 'features/editableProfileCard/model/selectors/getProfileForm/getProfileForm';
import {
    getProfileIsLoading
} from "features/editableProfileCard/model/selectors/getProfileIsLoading/getProfileIsLoading";
import {getProfileError} from "features/editableProfileCard/model/selectors/getProfileError/getProfileError";
import {getProfileReadOnly} from "features/editableProfileCard/model/selectors/getProfileReadOnly/getProfileReadOnly";
import {
    getProfileValidateErrors
} from "features/editableProfileCard/model/selectors/getProfileValidateErrors/getProfileValidateErrors";
import {fetchProfileData} from "features/editableProfileCard/model/services/fetchProfileData/fetchProfileData";
import {profileActions} from "features/editableProfileCard/model/slice/profileSlice";
import {ValidateProfileError} from "features/editableProfileCard/model/types/editableProfileCardSchema";
import {ProfileCard, profileReducer} from "entities/Profile";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

interface EditableProfileCardProps {
    className?: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className } = props;
    const { t } = useTranslation();

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

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.EditableProfileCard, {}, [className])}>
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
            </div>
        </DynamicModuleLoader>
    );
});