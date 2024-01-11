import {classNames} from "shared/lib/classNames/classNames";
import cls from './Page.module.scss'
import React, {memo, MutableRefObject, ReactNode, useRef, UIEvent} from "react";
import {useInfiniteScroll} from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";

interface PageProps {
    className?: string
    children: ReactNode
    onScrollEnd?: () => void
}

export const Page = memo((props: PageProps) => {

    const {
        className,
        children,
        onScrollEnd
    } = props

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd
    })

    const onScroll = (e: UIEvent) => {
        console.log('scroll', e.currentTarget.scrollTop)
    }

    return (
        <section
            ref={wrapperRef}
            className={classNames(
            cls.Page,
            {},
            [className])}
            onScroll={onScroll}
        >
            {children}
            <div ref={triggerRef} />
        </section>
    );
});
