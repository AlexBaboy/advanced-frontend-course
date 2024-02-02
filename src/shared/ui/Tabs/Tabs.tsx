import React, {memo, ReactNode} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './Tabs.module.scss'
import {Card} from "shared/ui/Card/Card";

interface TabItem {
    value: string
    content: ReactNode
}

interface TabsProps  {
    className?: string
    tabs: TabItem[]
    value: string
    onTabClick: (tab: TabItem) => void
}

export const Tabs = memo((props: TabsProps) => {

    const {
        className,
        tabs,
        onTabClick,
        value
    } = props

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map(tab => (
                <Card className={cls.tab} key={tab.value}>
                    {tab.content}
                </Card>
            ))}
        </div>
    );
});