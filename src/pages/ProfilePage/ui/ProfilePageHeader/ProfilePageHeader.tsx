import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePageHeader.module.scss'
import {useTranslation} from "react-i18next";
import {
    getProfileReadOnly,
    profileActions, updateProfileData,
} from "entities/Profile";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Text} from "shared/ui/Text/Text";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {useSelector} from "react-redux";
import {memo} from "react";


interface ProfilePageHeaderProps {
    className?: string
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {

    const {t} = useTranslation('profile')

    const {
        className,
    } = props

    const dispatch = useAppDispatch()

    const readonly = useSelector(getProfileReadOnly)

    const onEdit = () => {
        dispatch(profileActions.setReadOnly(false))
    }

    const onCancelEdit = () => {
        dispatch(profileActions.cancelEdit())
    }

    const onSave = () => {
        dispatch(updateProfileData())
    }

    return (
        <div className={classNames(
            cls.ProfilePageHeader,
            {},
            [className]
        )}>
            <Text title={t('Профиль')} />

            {readonly ? (
                <Button
                    theme={ButtonTheme.OUTLINE}
                    className={cls.editBtn}
                    onClick={onEdit}
                >
                    {t('Редактировать')}
                </Button>
            ) : (
                <>
                    <Button
                        theme={ButtonTheme.OUTLINE_RED}
                        className={cls.editBtn}
                        onClick={onCancelEdit}
                    >
                        {t('Отменить')}
                    </Button>

                    <Button
                        theme={ButtonTheme.OUTLINE}
                        className={cls.editBtn}
                        onClick={onSave}
                    >
                        {t('Сохранить')}
                    </Button>
                </>

            )}

        </div>
    );
};

export default memo(ProfilePageHeader)