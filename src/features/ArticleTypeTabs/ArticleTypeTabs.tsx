import {useTranslation} from 'react-i18next';
import {memo, useCallback, useMemo} from 'react';
import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './ArticleTypeTabs.module.scss';
import {TabItem, Tabs as TabsDeprecated} from '@/shared/ui/deprecated/Tabs/Tabs';
import {ArticleType} from '@/entities/Article';
import {ToggleFeatures} from "@/shared/lib/features";
import {Tabs} from "@/shared/ui/redesigned/Tabs/Tabs";

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const {className, value, onChangeType} = props;

    const {t} = useTranslation();

    const typeTabs = useMemo<TabItem[]>(
        () => [
            {
                value: ArticleType.ALL,
                content: t('Все'),
            },
            {
                value: ArticleType.IT,
                content: t('Айти'),
            },
            {
                value: ArticleType.SCIENCE,
                content: t('Наука'),
            },
            {
                value: ArticleType.ECONOMICS,
                content: t('Экономика'),
            },
        ],
        [t],
    );

    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.value as ArticleType);
        },
        [onChangeType],
    );

    return (

        <ToggleFeatures
            on={<Tabs
                direction={'column'}
                className={classNames(cls.ArticleViewSelector, {}, [className])}
                tabs={typeTabs}
                value={value}
                onTabClick={onTabClick}
            />}
            off={<TabsDeprecated
                className={classNames(cls.ArticleViewSelector, {}, [className])}
                tabs={typeTabs}
                value={value}
                onTabClick={onTabClick}
            />}
            feature={'isAppRedesigned'}
        />
    );
});
