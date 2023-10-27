import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleListItem.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";
import {Article, ArticleView} from "entities/Article";
import {Text} from "shared/ui/Text/Text";
import {Icon} from "shared/ui/Icon/Icon";
import EyeIcon from 'shared/assets/icons/eye.svg'

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

    if (view === ArticleView.BIG) {
        return (
            <div className={classNames(
                cls.ArticleListItem,
                {},
                [className, cls[view]]
            )}>
                {article.title}
            </div>
        )
    }

    return (
        <div className={classNames(
            cls.ArticleListItem,
            {},
            [className, cls[view]]
        )}>
            <div className={cls.card}>
                <div className={cls.imageWrapper}>
                    <img src={article.img} alt={article.title} className={cls.img} />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    <Text text={article.type.join(', ')} className={cls.types} />
                    <Text text={article?.views.toString() || '0'} className={cls.views} />
                    <Icon Svg={EyeIcon} />
                </div>
                <Text text={article.title} className={cls.title} />
            </div>
        </div>
    );
});
