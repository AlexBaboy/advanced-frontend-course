import {useTranslation} from 'react-i18next';
import {memo, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {classNames} from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {Text as TextDeprecated, TextAlign, TextSize} from '@/shared/ui/deprecated/Text/Text';
import {Text} from '@/shared/ui/redesigned/Text/Text';
import {Skeleton as SkeletonDeprecated} from '@/shared/ui/deprecated/Skeleton/Skeleton';
import {Skeleton} from '@/shared/ui/redesigned/Skeleton/Skeleton';
import {Avatar} from '@/shared/ui/deprecated/Avatar/Avatar';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import {Icon} from '@/shared/ui/deprecated/Icon/Icon';
import {HStack, VStack} from '@/shared/ui/redesigned/Stack';
import {ArticleBlock} from '../../../Article/model/types/article';
import {ArticleTextBlockComponent} from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import {ArticleCodeBlockComponent} from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import {ArticleImageBlockComponent} from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import {fetchArticleById} from '../../model/services/fetchArticleById/fetchArticleById';
import {articleDetailsReducer} from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import {ArticleBlockType} from '@/entities/Article/model/constants/constants';
import {ToggleFeatures} from "@/shared/lib/features";
import {AppImage} from "@/shared/ui/redesigned/AppImage";

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

const Deprecated = () => {
    const article = useSelector(getArticleDetailsData);
    return (
        <>
            <HStack justify="center" max className={cls.avatarWrapper}>
                <Avatar
                    size={200}
                    src={article?.img}
                    className={cls.avatar}
                />
            </HStack>
            <VStack gap="4" max data-testid="ArticleDetails.Info">
                <TextDeprecated
                    className={cls.title}
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.L}
                />
                <HStack gap="8" className={cls.articleInfo}>
                    <Icon className={cls.icon} Svg={EyeIcon}/>
                    <TextDeprecated text={article?.views?.toString()}/>
                </HStack>
                <HStack gap="8" className={cls.articleInfo}>
                    <Icon className={cls.icon} Svg={CalendarIcon}/>
                    <TextDeprecated text={article?.createdAt}/>
                </HStack>
            </VStack>
            {article?.blocks?.map(renderBlock)}
        </>
    )
}

const Redesigned = () => {
    const article = useSelector(getArticleDetailsData);
    return (
        <>
            <Text
                title={article?.title}
                size={"l"}
                bold
            />
            <Text
                title={article?.subtitle}
                size={"l"}
            />
            <AppImage fallback={<Skeleton width={'100%'} height={420} border={'16px'}/>} src={article?.img} className={cls.img}/>
            {article?.blocks?.map(renderBlock)}
        </>
    )
}

const renderBlock = (block: ArticleBlock) => {
    switch (block.type) {
        case ArticleBlockType.CODE:
            return (
                <ArticleCodeBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        case ArticleBlockType.IMAGE:
            return (
                <ArticleImageBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        case ArticleBlockType.TEXT:
            return (
                <ArticleTextBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        default:
            return null;
    }
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const {className, id} = props;

    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
        }
    }, [id]);

    let content;

    if (isLoading) {
        content = (
            <>
                <SkeletonDeprecated
                    className={cls.avatar}
                    width={200}
                    height={200}
                    border="50%"
                />
                <SkeletonDeprecated className={cls.title} width={300} height={32}/>
                <SkeletonDeprecated className={cls.skeleton} width={600} height={24}/>
                <SkeletonDeprecated className={cls.skeleton} width="100%" height={200}/>
                <SkeletonDeprecated className={cls.skeleton} width="100%" height={200}/>
            </>
        );
    } else if (error) {
        content = (
            <TextDeprecated
                title={t('Произошла ошибка при загрузке статьи')}
                align={TextAlign.CENTER}
            />
        );
    } else {
        content = (
            <ToggleFeatures feature={'isAppRedesigned'} on={<Redesigned/>} off={<Deprecated/>}/>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack
                gap="16"
                max
                className={classNames(cls.ArticleDetails, {}, [className])}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
