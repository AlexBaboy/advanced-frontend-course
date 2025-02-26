import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {useSelector} from 'react-redux';
import {AnyAction} from '@reduxjs/toolkit';
import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import {Button as ButtonDeprecated, ButtonTheme} from '@/shared/ui/deprecated/Button/Button';
import {Button} from '@/shared/ui/redesigned/Button/Button';
import {Input as InputDeprecated} from '@/shared/ui/deprecated/Input/Input';
import {Input} from '@/shared/ui/redesigned/Input/Input';
import {loginActions, loginReducer} from '../../model/slice/loginSlice';

import {loginByUsername} from '../../model/services/loginByUsername/loginByUsername';
import {TextTheme, Text as TextDeprecated} from '@/shared/ui/deprecated/Text/Text';
import {Text} from '@/shared/ui/redesigned/Text/Text';
import {getLoginUsername} from '../../model/selectors/getLoginUsername/getLoginUsername';
import {getLoginIsLoading} from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import {getLoginError} from '../../model/selectors/getLoginError/getLoginError';
import {getLoginPassword} from '../../model/selectors/getLoginPassword/getLoginPassword';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {ToggleFeatures} from "@/shared/lib/features";
import {VStack} from "@/shared/ui/redesigned/Stack";

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({className, onSuccess}: LoginFormProps) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUserName = (value: string) => {
        dispatch(loginActions.setUserName(value));
    };

    const onChangePassword = (value: string) => {
        dispatch(loginActions.setPassword(value));
    };

    const onLoginClick = async () => {
        const result = dispatch(
            loginByUsername({
                username,
                password,
            }) as unknown as AnyAction,
        );

        if (result?.meta?.requestStatus === 'fulfilled') {
            onSuccess();
        }
    };

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>

            <ToggleFeatures
                feature={'isAppRedesigned'}
                on={
                <VStack gap={'8'} className={classNames(cls.LoginForm, {}, [className])}>
                    <Text title={t('Форма авторизации')} />
                    {error && <Text text={error} variant={'error'} />}
                    <Input
                        placeholder={t('Введите логин')}
                        type="text"
                        className={cls.input}
                        autofocus
                        onChange={onChangeUserName}
                        value={username}
                    />
                    <Input
                        placeholder={t('Введите пароль')}
                        type="text"
                        className={cls.input}
                        onChange={onChangePassword}
                        value={password}
                    />
                    <Button
                        variant={'outline'}
                        className={cls.loginBtn}
                        onClick={onLoginClick}
                        disabled={isLoading}
                    >
                        {t('Войти')}
                    </Button>
                </VStack>}
                off={<div className={classNames(cls.LoginForm, {}, [className])}>
                    <TextDeprecated title={t('Форма авторизации')}/>
                    {error && <TextDeprecated text={error} theme={TextTheme.ERROR}/>}
                    <InputDeprecated
                        placeholder={t('Введите логин')}
                        type="text"
                        className={cls.input}
                        autofocus
                        onChange={onChangeUserName}
                        value={username}
                    />
                    <InputDeprecated
                        placeholder={t('Введите пароль')}
                        type="text"
                        className={cls.input}
                        onChange={onChangePassword}
                        value={password}
                    />
                    <ButtonDeprecated
                        theme={ButtonTheme.OUTLINE}
                        className={cls.loginBtn}
                        onClick={onLoginClick}
                        disabled={isLoading}
                    >
                        {t('Войти')}
                    </ButtonDeprecated>
                </div>}
            />


        </DynamicModuleLoader>
    );
});

export default LoginForm;
