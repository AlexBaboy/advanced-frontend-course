import React, {memo, ReactNode} from 'react';
import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import {Card} from '@/shared/ui/redesigned/Card/Card';
import {Flex, FlexDirection} from "@/shared/ui/redesigned/Stack/Flex/Flex";

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
    direction?: FlexDirection;
}

export const Tabs = memo((props: TabsProps) => {
    const {className, tabs, onTabClick, value, direction = 'row'} = props;

    const clickHandle = (tab: TabItem) => {
        console.log('tab clicked !!!');
        onTabClick(tab);
    };

    return (
        <Flex direction={direction} gap={'8'} align={'start'} className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    className={classNames(cls.tab, {[cls.selected]: tab.value === value})}
                    key={tab.value}
                    variant={
                        tab.value === value
                            ? 'light'
                            : 'normal'
                    }
                    onClick={() => clickHandle(tab)}
                    border={'round'}
                >
                    {tab.content}
                </Card>
            ))}
        </Flex>
    );
});
