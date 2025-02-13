import { memo, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StickyContentLayout.module.scss';

interface MainLayoutProps {
    className?: string;
    left?: ReactElement;
    content: ReactElement;
    right?: ReactElement;
}

export const StickyContentLayout = memo((props: MainLayoutProps) => {
    const { className, left, content, right } = props;

    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            <div className={cls.sidebar}>{left}</div>
            <div className={cls.content}>{content}</div>
            <div className={cls.right}>{right}</div>
        </div>
    );
});
