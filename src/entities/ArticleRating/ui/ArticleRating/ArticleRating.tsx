import {classNames} from "@/shared/lib/classNames/classNames";
import {useTranslation} from "react-i18next";
import {RatingCard} from "@/entities/Rating";
import {memo, useCallback, useMemo} from "react";
import {useGetArticleRating, useRateArticle} from "@/entities/ArticleRating/model/service/articleRatingApi";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {Skeleton} from "@/shared/ui/Skeleton/Skeleton";

interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

export const ArticleRating = memo((props: ArticleRatingProps) => {

    const {className, articleId} = props

    const {t} = useTranslation()

    const userData = useSelector(getUserAuthData)

    const {data, isLoading} = useGetArticleRating({
        articleId,
        userId: userData?.id ?? '',
    })

    const rating = useMemo(() => {
        return data?.[0]
    },[data])

    const [rateArticleMutation] = useRateArticle()

    const onAccept = useCallback(() => {},[])

    const onCancel = useCallback(() => {},[])

    const handleArticleRate = (starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: userData?.id ?? '',
                articleId,
                rate: starsCount,
                feedback
            })
        } catch (e) {
            console.log(e)
        }
    }

    if (isLoading) {
        return <Skeleton width="100%" height={120} />
    }

    return (
        <RatingCard className={classNames(
            '',
            {},
            [className]
        )}
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rating?.rate}
            title={t('Оцените статью')}
            feedbackTitle={t('Оставьте отзыв')}
            hasFeedback
        />
    );
});
