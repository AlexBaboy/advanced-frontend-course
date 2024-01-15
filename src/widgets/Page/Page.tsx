import {classNames} from "shared/lib/classNames/classNames";
import cls from './Page.module.scss'
import React, {memo, MutableRefObject, ReactNode, useRef, UIEvent} from "react";
import {useInfiniteScroll} from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {getUiScrollByPath, uiActions} from "features/ui";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {StateSchema} from "app/providers/StoreProvider";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {useThrottle} from "shared/lib/hooks/useThrottle/useThrottle";

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
    const dispatch = useAppDispatch()
    const {pathname} = useLocation()
    const scrollPositions = useSelector((state: StateSchema) => getUiScrollByPath(state, pathname))

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd
    })

    useInitialEffect(() => {
        console.log('39 scrollPositions', scrollPositions)
        wrapperRef.current.scrollTop = scrollPositions
    })

    const onScroll = useThrottle((e: UIEvent) => {
        console.log('44 scroll', e.currentTarget.scrollTop)
        console.log('45 pathname', pathname)
        dispatch(uiActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname
        }))
    }, 500)

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
