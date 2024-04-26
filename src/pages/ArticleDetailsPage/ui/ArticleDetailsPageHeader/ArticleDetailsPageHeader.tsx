import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';
import { getCanEditArticle } from 'pages/ArticleDetailsPage/model/selectors/article/article';
import { HStack } from 'shared/ui/Stack';

interface ArticleDetailsPageHeaderProps {
    className?: string
}

const ArticleDetailsPageHeader = (props: ArticleDetailsPageHeaderProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('article-details');
    const navigate = useNavigate();
    const userData = useSelector(getUserAuthData);
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, []);

    const onEdit = useCallback(() => {
        navigate(`${RoutePath.article_details}${article?.id}/edit`);
    }, [article?.id]);

    return (
        <HStack
            max
            justify={'between'}
            className={classNames(
            '',
            {},
            [className],
        )}
        >
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onBackToList}
            >
                {t('Назад к списку')}
            </Button>

            {canEdit && (
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onEdit}
                >
                    {t('Редактировать')}
                </Button>
            )}

        </HStack>
    );
};

export default memo(ArticleDetailsPageHeader);
