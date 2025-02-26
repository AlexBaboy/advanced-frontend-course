import { getArticleDetailsData } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { useSelector } from 'react-redux';
import cls from './AdditionalInfoContainer.module.scss';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { getRouteArticleEdit } from '@/shared/config/routeConfig/routeConfig';

export const AdditionalInfoContainer = () => {
    const article = useSelector(getArticleDetailsData);

    const navigate = useNavigate();

    const onEdit = useCallback(() => {
        if (article?.id) {
            navigate(getRouteArticleEdit(article.id));
        }
    }, [article?.id]);

    if (!article) return null;

    return (
        <Card padding={'24'} border={'partial'} className={cls.card}>
            <ArticleAdditionalInfo
                author={article.user}
                createdAt={article.createdAt}
                views={article.views}
                onEdit={onEdit}
            />
        </Card>
    );
};
