import {classNames} from "shared/lib/classNames/classNames";
import cls from './LoginForm.module.scss'
import {useTranslation} from "react-i18next";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import Input from "shared/ui/Input/Input";
import {memo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginActions} from "../../model/slice/loginSlice";
import {getLoginState} from "../../model/selectors/getLoginState/getLoginState";
import {LoginSchema} from "features/AuthByUserName";
import {loginByUsername} from "../../model/services/loginByUsername/loginByUsername";
import {AnyAction} from "@reduxjs/toolkit";
import {TextTheme, Text} from "shared/ui/Text/Text";

export interface LoginFormProps {
    className?: string
}

const LoginForm = memo(({className}: LoginFormProps) => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const {
        username = '',
        password = '',
        error,
        isLoading
    } = useSelector(getLoginState) as LoginSchema

    const onChangeUserName = (value: string) => {
        dispatch(loginActions.setUserName(value))
    }

    const onChangePassword = (value: string) => {
        dispatch(loginActions.setPassword(value))
    }

    const onLoginClick = () => {
        dispatch(loginByUsername({
            username,
            password
        }) as unknown as AnyAction)
    }

    return (
        <div className={classNames(
            cls.LoginForm,
            {},
            [className]
        )}>
            <Text title={t('Форма авторизации')} />
            {error && (
                <Text
                    text={error}
                    theme={TextTheme.ERROR}
                />
            )}
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
                theme={ButtonTheme.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t('Войти')}
            </Button>
        </div>
    );
});

export default LoginForm