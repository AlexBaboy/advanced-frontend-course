import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from './CommentList.module.scss'
import {useTranslation} from "react-i18next";
import {memo } from "react";
import {CommentItem} from "entities/Comment";
import {Text} from "shared/ui/Text/Text";
import {CommentCard} from "../CommentCard/CommentCard";

interface CommentListProps {
    className?: string
    comments?: CommentItem[]
    isLoading?: boolean
}

export const CommentList = memo((props: CommentListProps) => {

    const {
        className,
        comments,
        isLoading
    } = props

    const {t} = useTranslation()

    if (isLoading) {
        return (
            <div
                className={classNames(
                    cls.CommentList,
                    {},[className])}
            >
                <CommentCard isLoading />
            </div>
        )
    }

    return (
        <div
            className={classNames(
                cls.CommentList,
                {},[className])}
        >
            {comments?.length
                ? (
                    comments.map(comment => (
                        <CommentCard
                            comment={comment}
                            className={cls.comment}
                            isLoading={isLoading}
                        />
                    )))
                :
                    <Text text={t('Комментарии отсутствуют')} />
            }
        </div>
    );
})
