import {MutableRefObject, useCallback, useEffect, useRef, useState} from "react";

interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay?: number;
}

export const useModal = (props: UseModalProps) => {

    const {onClose, isOpen, animationDelay} = props

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    useEffect(() => {
        isOpen && setIsMounted(true)
    }, [isOpen])

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, animationDelay)
        }
    }, [onClose, animationDelay])

    useEffect(() => {

        const onKeyDownHandler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                close()
            }
        }

        isOpen && window.addEventListener('keydown', onKeyDownHandler)
        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onKeyDownHandler)
        }
    }, [isOpen, close])

    return {
        isClosing,
        isMounted,
        close
    }
}