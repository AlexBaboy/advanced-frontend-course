import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleListItem.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback} from "react";
import {Article, ArticleView} from "entities/Article";
import {Text} from "shared/ui/Text/Text";
import {Icon} from "shared/ui/Icon/Icon";
import EyeIcon from 'shared/assets/icons/eye.svg'
import {Card} from "shared/ui/Card/Card";
import {Avatar} from "shared/ui/Avatar/Avatar";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {ArticleBlockType, ArticleTextBlock} from "entities/Article/model/types/article";
import {ArticleTextBlockComponent} from "entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "shared/config/routeConfig/routeConfig";

interface ArticleListItemProps {
    className?: string
    article: Article
    view?: ArticleView
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {

    const {
        className,
        article,
        view = ArticleView.SMALL} = props

    const {t} = useTranslation()
    const navigate = useNavigate()

    const onOpenArticle = useCallback(() => {
        navigate(RoutePath.article_details + article.id)
    }, [article?.id])

    const types = <Text text={article.type?.join(', ')} className={cls.types} />
    const views = (
        <>
            <Text text={article?.views?.toString() || '0'} className={cls.views} />
            <Icon Svg={EyeIcon} />
        </>
    )

    if (view === ArticleView.BIG) {

        const texBlock = article.blocks.find(block => block.type === ArticleBlockType.TEXT) as ArticleTextBlock

        return (
            <div className={classNames(
                cls.ArticleListItem,
                {},
                [className, cls[view]]
            )}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30} src={article?.user?.avatar} />
                        <Text text={article.user?.username} className={cls.username} />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <Text text={article.title} className={cls.title} />
                    {types}
                    <img src={article.img} alt={article.title} className={cls.img} />
                    {texBlock && (
                        <ArticleTextBlockComponent
                            block={texBlock}
                            className={cls.textBlock}
                        />
                    )}
                    <div className={cls.footer}>
                        <Button
                            onClick={onOpenArticle}
                            theme={ButtonTheme.OUTLINE}>
                            {t('Читать далее')}
                        </Button>
                        {views}
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className={classNames(
            cls.ArticleListItem,
            {},
            [className, cls[view]]
        )}>
            <Card className={cls.card} onClick={onOpenArticle}>
                <div className={cls.imageWrapper}>
                    <img src={article.img} alt={article.title} className={cls.img} />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </div>
    );
});
