import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { updateProfileData } from '@/features/editableProfileCard/model/services/updateProfileData/updateProfileData';
import { profileActions } from '@/features/editableProfileCard/model/slice/profileSlice';
import { getProfileReadOnly } from '@/features/editableProfileCard/model/selectors/getProfileReadOnly/getProfileReadOnly';
import { getProfileData } from '@/features/editableProfileCard/model/selectors/getProfileData/getProfileData';

interface EditableProfileHeaderProps {
    className?: string;
}

export const EditableProfileHeader = (props: EditableProfileHeaderProps) => {
    const { t } = useTranslation('profile');

    const { className } = props;

    const dispatch = useAppDispatch();

    const readonly = useSelector(getProfileReadOnly);
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;

    const onEdit = () => {
        dispatch(profileActions.setReadOnly(false));
    };

    const onCancelEdit = () => {
        dispatch(profileActions.cancelEdit());
    };

    const onSave = () => {
        dispatch(updateProfileData());
    };

    return (
        <HStack
            max
            justify="between"
            className={classNames('', {}, [className])}
        >
            <Text title={t('Профиль')} />

            {canEdit && (
                <>
                    {readonly ? (
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onEdit}
                            data-testid="EditableProfileHeader.EditButton"
                        >
                            {t('Редактировать')}
                        </Button>
                    ) : (
                        <HStack gap="8">
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={onCancelEdit}
                                data-testid="EditableProfileHeader.CancelButton"
                            >
                                {t('Отменить')}
                            </Button>

                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={onSave}
                                data-testid="EditableProfileHeader.SaveButton"
                            >
                                {t('Сохранить')}
                            </Button>
                        </HStack>
                    )}
                </>
            )}
        </HStack>
    );
};

export default memo(EditableProfileHeader);
