import {classNames} from "shared/lib/classNames/classNames";
import cls from './AddCommentForm.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback,} from "react";
import {addCommentFormActions, addCommentFormReducer} from "../../model/slice/addCommentFormSlice";

import {Text} from "shared/ui/Text/Text";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Input} from "shared/ui/Input/Input";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {useSelector} from "react-redux";
import {getAddCommentFormError, getAddCommentFormText} from "../../model/selectors/addCommentFormSelectors";
import {sendComment} from "features/addCommentForm/model/services/sendComment/sendComment";

export interface AddCommentFormProps {
    className?: string
    onSuccess: () => void
}

const initialReducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
}

const AddCommentForm = memo(({className, onSuccess}: AddCommentFormProps) => {

    const {t} = useTranslation()
    const dispatch = useAppDispatch()

   const text = useSelector(getAddCommentFormText)
   const error = useSelector(getAddCommentFormError)

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value))
    }, [])

    const onSendComment = useCallback(async () => {
        dispatch(sendComment())
        await dispatch(addCommentFormActions.setText(''))
    }, [])

    return (
        <DynamicModuleLoader
            reducers={initialReducers}>
            <div className={classNames(
                cls.AddCommentForm,
                {},
                [className]
            )}>
                <Input
                    placeholder={t('Введите текст комментария')}
                    value={text}
                    onChange={onCommentTextChange}
                    className={cls.input}
                />
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onSendComment}
                >
                    {t('Отправить')}
                </Button>



            </div>
        </DynamicModuleLoader>
    );
});

export default AddCommentForm
