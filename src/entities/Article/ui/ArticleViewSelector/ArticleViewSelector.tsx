import {classNames} from "shared/lib/classNames/classNames";
import cls from './ArticleViewSelector.module.scss'
import {useTranslation} from "react-i18next";
import {memo} from "react";
import {ArticleView} from "../../model/types/article";
import ListIcon from 'shared/assets/icons/list.svg'
import GridIcon from 'shared/assets/icons/grid.svg'
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {Icon} from "shared/ui/Icon/Icon";

interface ArticleViewSelectorProps {
    className?: string
    view: ArticleView
    onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon:  GridIcon
    },
    {
        view: ArticleView.BIG,
        icon: ListIcon
    }
]

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {

    const {className, view, onViewClick} = props

    const {t} = useTranslation()

    const onClickHandler = (newView: ArticleView) => {
        onViewClick?.(newView)
    }

    return (
        <div className={classNames(
            cls.ArticleViewSelector,
            {},
            [className]
        )}>
            {viewTypes.map((viewType, index) => (
                <Button
                    theme={ButtonTheme.CLEAR}
                    key={index}
                    // @ts-ignore
                    onClick={() => onClickHandler(viewType.view)}
                >
                    <Icon
                        Svg={viewType.icon}
                        className={classNames('', {[cls.notSelected]: viewType.view !== view})}
                    />
                </Button>
            ))}
        </div>
    );
});
