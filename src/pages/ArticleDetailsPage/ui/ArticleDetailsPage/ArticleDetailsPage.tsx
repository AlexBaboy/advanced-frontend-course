import {classNames} from '@/shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {ArticleDetails} from '@/entities/Article';
import {useParams} from 'react-router-dom';
import {DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {Page} from '@/widgets/Page/Page';
import ArticleDetailsPageHeader from '@/pages/ArticleDetailsPage/ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { articleDetailsPageReducer } from '../../model/slices';
import cls from './ArticleDetailsPage.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetailsComments } from '@/pages/ArticleDetailsPage/ui/ArticleDetailsComments/ArticleDetailsComments';

interface ArticleDetailsPageProps {
    className?: string
}

const reducers: ReducersList = {
    articlesDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
                <Page className={classNames(
                    cls.ArticleDetailsPage,
                    {},
                    [className],
                )}
                >
                    {t('Статья не найдена')}
                </Page>
            </DynamicModuleLoader>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(
                cls.ArticleDetailsPage,
                {},
                [className],
            )}
            >
                <VStack gap={'16'} max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>

            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
