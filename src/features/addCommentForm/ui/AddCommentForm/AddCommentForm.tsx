import {useTranslation} from 'react-i18next';
import {memo, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {classNames} from '@/shared/lib/classNames/classNames';
import {DynamicModuleLoader, ReducersList,} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {Input as InputDeprecated} from '@/shared/ui/deprecated/Input/Input';
import {Input} from '@/shared/ui/redesigned/Input/Input';
import {Button as ButtonDeprecated, ButtonTheme,} from '@/shared/ui/deprecated/Button/Button';
import {Button} from '@/shared/ui/redesigned/Button/Button';
import {HStack} from '@/shared/ui/redesigned/Stack';
import {addCommentFormActions, addCommentFormReducer,} from '../../model/slice/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';
import {getAddCommentFormError, getAddCommentFormText,} from '../../model/selectors/addCommentFormSelectors';
import {ToggleFeatures} from '@/shared/lib/features';
import {Card} from '@/shared/ui/redesigned/Card/Card';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const initialReducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo(
    ({ className, onSendComment }: AddCommentFormProps) => {
        const { t } = useTranslation();
        const dispatch = useAppDispatch();

        const text = useSelector(getAddCommentFormText);
        const error = useSelector(getAddCommentFormError);

        const onCommentTextChange = useCallback((value: string) => {
            dispatch(addCommentFormActions.setText(value));
        }, []);

        const onSendHandler = useCallback(() => {
            onSendComment(text || '');
            onCommentTextChange('');
        }, [onSendComment, text]);

        return (
            <DynamicModuleLoader reducers={initialReducers}>
                <ToggleFeatures
                    feature={'isAppRedesigned'}
                    on={
                        <Card padding={'24'} border={'partial'} max>
                            <HStack
                                gap={'16'}
                                data-testid="AddCommentForm"
                                max
                                justify="between"
                                className={classNames(
                                    cls.AddCommentFormRedesigned,
                                    {},
                                    [className],
                                )}
                            >
                                <Input
                                    data-testid="AddCommentForm.Input"
                                    placeholder={t('Введите текст комментария')}
                                    value={text}
                                    onChange={onCommentTextChange}
                                    className={cls.input}
                                />
                                <Button
                                    data-testid="AddCommentForm.Button"
                                    onClick={onSendHandler}
                                >
                                    {t('Отправить')}
                                </Button>
                            </HStack>
                        </Card>
                    }
                    off={
                        <HStack
                            data-testid="AddCommentForm"
                            max
                            justify="between"
                            className={classNames(cls.AddCommentForm, {}, [
                                className,
                            ])}
                        >
                            <InputDeprecated
                                data-testid="AddCommentForm.Input"
                                placeholder={t('Введите текст комментария')}
                                value={text}
                                onChange={onCommentTextChange}
                                className={cls.input}
                            />
                            <ButtonDeprecated
                                data-testid="AddCommentForm.Button"
                                theme={ButtonTheme.OUTLINE}
                                onClick={onSendHandler}
                            >
                                {t('Отправить')}
                            </ButtonDeprecated>
                        </HStack>
                    }
                />
            </DynamicModuleLoader>
        );
    },
);

export default AddCommentForm;
