import {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getRouteArticleEdit, getRouteArticles} from '@/shared/config/routeConfig/routeConfig';
import {Button, ButtonTheme} from '@/shared/ui/Button/Button';
import {classNames} from '@/shared/lib/classNames/classNames';
import {getArticleDetailsData} from '@/entities/Article';
import {HStack} from '@/shared/ui/Stack';
import {getCanEditArticle} from '../../model/selectors/article/article';

interface ArticleDetailsPageHeaderProps {
    className?: string
}

const ArticleDetailsPageHeader = (props: ArticleDetailsPageHeaderProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('article-details');
    const navigate = useNavigate();
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    const onBackToList = useCallback(() => {
        navigate(getRouteArticles());
    }, []);

    const onEdit = useCallback(() => {
        if (article?.id) {
            navigate(getRouteArticleEdit(article.id));
        }
    }, [article?.id]);

    return (
        <HStack
            max
            justify="between"
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
