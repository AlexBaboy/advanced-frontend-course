import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleDetailsPageHeader.module.scss'
import {memo} from "react";
import {Page} from "widgets/Page/Page";

interface ArticleDetailsPageHeader {
    className?: string
}

const ArticleDetailsPageHeader = (props: ArticleDetailsPageHeader) => {

    const {
        className
    } = props

    return (
            <Page className={classNames(
                cls.ArticleDetailsPageHeader,
                {},
                [className]
            )}>
                ArticleDetailsPageHeader
            </Page>
    );
};

export default memo(ArticleDetailsPageHeader)