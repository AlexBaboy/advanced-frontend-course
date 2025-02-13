import { MutableRefObject, useEffect } from 'react';

export type useInfiniteScrollOptions = {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef: MutableRefObject<HTMLElement>;
};

export const useInfiniteScroll = ({
    callback,
    triggerRef,
    wrapperRef,
}: useInfiniteScrollOptions) => {
    useEffect(() => {
        let observer: IntersectionObserver | null = null;

        const wrapperElement = wrapperRef?.current || null;
        const triggerRefElement = triggerRef.current;

        if (callback && triggerRefElement && wrapperElement) {
            const options = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback?.();
                }
            }, options);

            observer.observe(triggerRefElement);
        }

        return () => {
            if (observer && triggerRefElement) {
                observer.unobserve(triggerRefElement);
            }
        };
    }, [callback, wrapperRef, triggerRef]);
};
