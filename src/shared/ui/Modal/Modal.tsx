import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from './Modal.module.scss'
import React, {MutableRefObject, ReactNode, useEffect, useRef, useState} from "react";
import {Portal} from "shared/ui/Portal/Portal";

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

const ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {

    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props

    const [isClosing, setIsClosing] = useState(false)
    const [isMounted, setMounted] = useState(false)

    const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

    useEffect(() => {
        isOpen && setMounted(true)
    }, [isOpen])

    useEffect(() => {

        const onKeyDownHandler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeHandler()
            }
        }

        isOpen && window.addEventListener('keydown', onKeyDownHandler)
        return () => {
            clearTimeout(timeRef.current)
            window.removeEventListener('keydown', onKeyDownHandler)
        }
    }, [])

    const closeHandler = () => {
        if (onClose) {
            setIsClosing(true)
            timeRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, ANIMATION_DELAY)
        }
    }

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    }

    if (lazy && !isMounted) {
        return null
    }

    return (
        <Portal>
            <div className={classNames(
                cls.Modal,
                mods,
                [className]
            )}>

                <div className={cls.overlay}
                     onClick={closeHandler}
                >
                    <div className={cls.content}
                         onClick={onContentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
