import {classNames} from 'shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {CommentItem} from '../../../Comment';
import {Text} from 'shared/ui/Text/Text';
import {CommentCard} from '../CommentCard/CommentCard';
import {VStack} from "shared/ui/Stack";

interface CommentListProps {
    className?: string
    comments?: CommentItem[]
    isLoading?: boolean
}

export const CommentList = memo((props: CommentListProps) => {
    const {
        className,
        comments,
        isLoading,
    } = props;

    const { t } = useTranslation();

    if (isLoading) {
        return (
            <VStack
                max
                gap={'16'}
                className={classNames(
                    '',
                    {},
                    [className],
                )}
            >
                <CommentCard isLoading />
            </VStack>
        );
    }

    return (
        <VStack
            gap={'16'}
            max
            className={classNames(
                '',
                {},
                [className],
            )}
        >
            {comments?.length
                ? (
                    comments.map((comment) => (
                        <CommentCard
                            comment={comment}
                            isLoading={isLoading}
                            key={comment.id}
                        />
                    )))
                : <Text text={t('Комментарии отсутствуют')} />}
        </VStack>
    );
});
