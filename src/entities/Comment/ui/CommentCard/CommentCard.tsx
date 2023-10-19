import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from './CommentCard.module.scss'
import {useTranslation} from "react-i18next";
import {memo } from "react";
import {CommentItem} from "entities/Comment";
import {Avatar} from "shared/ui/Avatar/Avatar";
import {Text} from "shared/ui/Text/Text";
import {Skeleton} from "shared/ui/Skeleton/Skeleton";
import {AppLink} from "shared/ui/AppLink/AppLink";
import {RoutePath} from "shared/config/routeConfig/routeConfig";

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

    if (isLoading) {
        return (
            <div
                className={classNames(
                    cls.CommentCard,
                    mods,[className])}
            >
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border={'50%'} />
                    <Skeleton width={100} height={16} className={cls.username} />
                </div>
                <Skeleton width={'100%'} height={50} className={cls.text} />
            </div>
        )
    }

    return (
        <div
            className={classNames(
                cls.CommentCard,
                mods,[className])}
        >
            <AppLink to={`${RoutePath.profile}${comment?.user.id}`} className={cls.header}>
                {comment?.user?.avatar ? <Avatar size={30} src={comment?.user?.avatar} /> : null}
                <Text title={comment?.user.username} className={cls.username}/>
            </AppLink>
            <Text text={comment?.text} className={cls.text} />
        </div>
    );
})
