import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { HStack } from '@/shared/ui/Stack';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';

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
                <HStack
                    data-testid="AddCommentForm"
                    max
                    justify="between"
                    className={classNames(cls.AddCommentForm, {}, [className])}
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
                        theme={ButtonTheme.OUTLINE}
                        onClick={onSendHandler}
                    >
                        {t('Отправить')}
                    </Button>
                </HStack>
            </DynamicModuleLoader>
        );
    },
);

export default AddCommentForm;
