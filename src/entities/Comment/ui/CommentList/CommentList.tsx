import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { CommentItem } from '../../../Comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { ToggleFeatures } from '@/shared/lib/features';

interface CommentListProps {
    className?: string;
    comments?: CommentItem[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const { className, comments, isLoading } = props;

    const { t } = useTranslation();

    if (isLoading) {
        return (
            <VStack max gap="16" className={classNames('', {}, [className])}>
                <CommentCard isLoading />
            </VStack>
        );
    }

    return (
        <VStack max gap="8" className={classNames('', {}, [className])}>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard
                        comment={comment}
                        isLoading={isLoading}
                        key={comment.id}
                    />
                ))
            ) : (
                <ToggleFeatures
                    feature={'isAppRedesigned'}
                    on={<Text text={t('Комментарии отсутствуют')} />}
                    off={<TextDeprecated text={t('Комментарии отсутствуют')} />}
                />
            )}
        </VStack>
    );
});
