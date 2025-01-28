import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { RatingCard } from '@/entities/Rating';
import {
    useGetArticleRating,
    useRateArticle,
} from '@/entities/ArticleRating/model/service/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props;

    const { t } = useTranslation();

    const userData = useSelector(getUserAuthData);

    const { data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? '',
    });

    const rating = useMemo(() => {
        return data?.[0];
    }, [data]);

    const [rateArticleMutation] = useRateArticle();

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleArticleRate(starsCount, feedback);
    }, []);

    const onCancel = useCallback((starsCount: number) => {
        handleArticleRate(starsCount);
    }, []);

    const handleArticleRate = (starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: userData?.id ?? '',
                articleId,
                rate: starsCount,
                feedback,
            });
        } catch (e) {
            console.log(e);
        }
    };

    if (isLoading) {
        return <Skeleton width="100%" height={120} />;
    }

    return (
        <RatingCard
            className={classNames('', {}, [className])}
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rating?.rate}
            title={t('Оцените статью')}
            feedbackTitle={t('Оставьте отзыв')}
            hasFeedback
        />
    );
});

export default ArticleRating;
