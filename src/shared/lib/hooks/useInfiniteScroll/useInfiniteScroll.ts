import {MutableRefObject, useEffect} from "react";

export type useInfiniteScrollOptions = {
    callback?: () => void
    triggerRef:  MutableRefObject<HTMLElement>
    wrapperRef:  MutableRefObject<HTMLElement>
}

export const useInfiniteScroll = ({
                                      callback,
                                      triggerRef,
                                      wrapperRef}:
                                      useInfiniteScrollOptions) => {

    useEffect(() => {

        let observer: IntersectionObserver | null = null;

        if (callback && triggerRef.current && wrapperRef.current) {
            const options = {
                root: wrapperRef.current,
                rootMargin: "0px",
                threshold: 1.0,
            };

            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback?.()
                }
            }, options);

            observer.observe(triggerRef.current)
        }

        return () => {
            if (observer && triggerRef.current) {
                observer.unobserve(triggerRef.current);
            }
        }
    }, [callback, wrapperRef, triggerRef])
}