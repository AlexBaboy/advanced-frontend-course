import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { LIMIT_RECOMMENDATIONS_COUNT } from '@/pages/ArticleDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { useArticlesRecommendationsList } from '@/features/articleRecommendationsList/ui/api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps) => {
        const { className } = props;
        const { t } = useTranslation();

        const {
            data: articles,
            isLoading,
            error,
        } = useArticlesRecommendationsList(LIMIT_RECOMMENDATIONS_COUNT);

        if (isLoading || error || !articles) return null;

        return (
            <VStack
                data-testid="ArticleRecommendationsList"
                gap="8"
                className={classNames('', {}, [className])}
            >
                <Text title={t('Рекомендуем')} size={TextSize.L} />
                <ArticleList
                    articles={articles}
                    isLoading={isLoading}
                    target="_blank"
                />
            </VStack>
        );
    },
);
