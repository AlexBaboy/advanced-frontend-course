import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss'
import {useTranslation} from "react-i18next";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
    fetchProfileData,
    Profile,
    ProfileCard,
    profileReducer
} from "entities/Profile";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useEffect} from "react";
import {Loader} from "shared/ui/Loader/Loader";
import {Text} from "shared/ui/Text/Text";
import {Button, ButtonTheme} from "shared/ui/Button/Button";


const reducers: ReducersList = {
    profile: profileReducer
}

interface ProfilePageHeaderProps {
    className?: string
    data?: Profile
    error?: string
    isLoading?: boolean
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {

    const {t} = useTranslation()

    const {
        className,
    } = props

    const dispatch = useAppDispatch()


    return (
        <div className={classNames(
            cls.ProfilePageHeader,
            {},
            [className]
        )}>
            <Text title={t('Профиль')} />
            <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.editBtn}
            >
                {t('Редактировать')}
            </Button>
        </div>
    );
};

export default ProfilePageHeader