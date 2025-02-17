import {useTranslation} from 'react-i18next';
import {HTMLAttributeAnchorTarget, memo, useMemo} from 'react';
import {classNames} from '@/shared/lib/classNames/classNames';
import {Article, ArticleView} from '../../../';
import {Text} from '@/shared/ui/redesigned/Text/Text';
import {Icon} from '@/shared/ui/redesigned/Icon/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import {Card} from '@/shared/ui/redesigned/Card/Card';
import {Avatar} from '@/shared/ui/redesigned/Avatar/Avatar';
import {Button} from '@/shared/ui/redesigned/Button/Button';
import {getRouteArticleDetails} from '@/shared/config/routeConfig/routeConfig';
import {AppLink} from '@/shared/ui/redesigned/AppLink/AppLink';
import {ARTICLES_LIST_ITEM_INDEX} from '@/shared/const/localStorage';
import {ArticleTextBlock} from '../../../model/types/article';
import cls from './ArticleListItemRedesigned.module.scss';
import {ArticleBlockType} from '../../../model/constants/constants';
import {AppImage} from '@/shared/ui/redesigned/AppImage';
import {Skeleton} from '@/shared/ui/deprecated/Skeleton/Skeleton';
import {HStack, VStack} from '@/shared/ui/redesigned/Stack';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    index?: number;
}

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view = ArticleView.SMALL,
        target,
        index,
    } = props;

    const {t} = useTranslation();

    const types = (
        <Text text={article?.type?.join(', ')} className={cls.types}/>
    );
    const views = (
        <HStack gap={'8'}>
            <Icon Svg={EyeIcon}/>
            <Text
                text={article?.views?.toString() || '0'}
                className={cls.views}
            />
        </HStack>
    );

    const handleButtonClick = () => {
        sessionStorage.setItem(ARTICLES_LIST_ITEM_INDEX, JSON.stringify(index));
    };


    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        const textToRender = useMemo(() => {
            return textBlock?.paragraphs?.slice(0,2)?.join(' ') || ''
        }, [textBlock?.paragraphs])

        return (
            <Card
                padding={'24'}
                max
                data-testid={'ArticleListItem'}
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <VStack max gap={'16'}>
                    <HStack max gap={'8'}>
                        <Avatar size={32} src={article?.user?.avatar}/>
                        <Text bold text={article.user?.username}/>
                        <Text text={article.createdAt}/>
                    </HStack>
                    <Text text={article.title} bold/>
                    <Text text={article.subtitle} size={'s'}/>

                    <AppImage
                        fallback={<Skeleton width="100%" height={250}/>}
                        src={article.img}
                        alt={article.title}
                        className={cls.img}
                    />

                    {textToRender && (
                        <Text
                            className={cls.textBlock}
                            text={textToRender}
                        />
                    )}

                    <HStack max justify={'between'}>
                        <AppLink
                            target={target}
                            to={getRouteArticleDetails(article?.id)}
                        >
                            <Button variant={'outline'} onClick={handleButtonClick}>
                                {t('Читать далее')}
                            </Button>
                        </AppLink>

                        {views}

                    </HStack>

                </VStack>

            </Card>
        );
    }

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article?.id)}
            className={classNames(cls.ArticleListItem, {}, [
                className,
                cls[view],
            ])}
            onClick={handleButtonClick}
        >
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <AppImage
                        fallback={<Skeleton width={200} height={200}/>}
                        src={article.img}
                        alt={article.title}
                        className={cls.img}
                    />
                    <Text text={article.createdAt} className={cls.date}/>
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title}/>
            </Card>
        </AppLink>
    );
});
