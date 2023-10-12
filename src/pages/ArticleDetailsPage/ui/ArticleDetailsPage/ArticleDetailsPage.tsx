import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetailsPage.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";
import {ArticleDetails} from "entities/Article";
import {useParams} from "react-router-dom";
import {Text} from "shared/ui/Text/Text";
import {CommentList} from "entities/Comment";

interface ArticleDetailsPage {
    className?: string
}

const ArticleDetailsPage = (props: ArticleDetailsPage) => {

    const {className} = props
    const {t} = useTranslation('comment')
    const {id} = useParams<{id: string}>()

    if (!id) {
        return (
            <div className={classNames(
                cls.ArticleDetailsPage,
                {},
                [className]
            )}>
                {t('Статья не найдена')}
            </div>
        )
    }

    return (
        <div className={classNames(
            cls.ArticleDetailsPage,
            {},
            [className]
        )}>
            <ArticleDetails id={id} />
            <Text title={t('Комментарии')} className={cls.commentTitle} />
            <CommentList isLoading={true} comments={[
                {
                    id: '1',
                    text: 'comment 1',
                    user: {id: '1', username: 'alex', avatar: 'https://s0.rbk.ru/v6_top_pics/media/img/8/60/756615119370608.jpg'}
                },
                {
                    id: '2',
                    text: 'comment 2',
                    user: {id: '1', username: 'alex', avatar: 'https://yt3.ggpht.com/ytc/AAUvwngFzM_Rf6MNwOnFcuphoj93k7VFjlIrj-kSMxbh=s900-c-k-c0x00ffffff-no-rj'}
                }
            ]} />
        </div>
    );
};

export default memo(ArticleDetailsPage)