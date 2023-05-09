import {classNames} from "shared/lib/classNames/classNames";
import cls from './LoginForm.module.scss'
import {useTranslation} from "react-i18next";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import Input from "shared/ui/Input/Input";
import {memo, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginActions} from "../../model/slice/loginSlice";
import {getLoginState} from "../../model/selectors/getLoginState/getLoginState";

interface LoginFormProps {
    className?: string
}

export const LoginForm = memo(({className}: LoginFormProps) => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const {
        username,
        password
    } = useSelector(getLoginState)

    const onChangeUserName = useCallback((value: string) => {
        dispatch(loginActions.setUserName(value))
    },[])

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))
    },[])

    return (
        <div className={classNames(
                    cls.LoginForm,
                    {},
                [className]
            )}>
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
            >
                {t('Войти')}
            </Button>
        </div>
    );
});
