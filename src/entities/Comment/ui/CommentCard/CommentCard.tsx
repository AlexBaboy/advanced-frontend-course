import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from './CommentCard.module.scss'
import {useTranslation} from "react-i18next";
import {memo } from "react";
import {CommentItem} from "entities/Comment";
import {Avatar} from "shared/ui/Avatar/Avatar";
import {Text} from "shared/ui/Text/Text";

interface CommentCardProps {
    className?: string
    comment?: CommentItem
    isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {

    const {
        className,
        comment,
        isLoading
    } = props

    const {t} = useTranslation()

    const mods: Mods = {}

    return (
        <div
            className={classNames(
                cls.CommentCard,
                mods,[className])}
        >
            <div className={cls.header}>
                {comment?.user?.avatar ? <Avatar size={30} src={comment?.user?.avatar} /> : null}
                <Text title={comment?.user.username} className={cls.username}/>
            </div>
            <Text text={comment?.text} className={cls.text} />
        </div>
    );
})
