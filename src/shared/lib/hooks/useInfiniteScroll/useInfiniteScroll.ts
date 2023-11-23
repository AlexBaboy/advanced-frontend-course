import {MutableRefObject, useEffect, useRef} from "react";

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
        if (callback) {
            const options = {
                root: wrapperRef.current,
                rootMargin: "0px",
                threshold: 1.0,
            };

            const  observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback?.()
                }
            }, options);
            observer.observe(triggerRef.current)
        }

        return () => {
            observer && observer.unobserve(triggerRef.current)
        }
    }, [callback, wrapperRef, triggerRef])
}