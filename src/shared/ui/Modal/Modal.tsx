import {classNames} from "shared/lib/classNames/classNames";
import cls from './Modal.module.scss'
import React, {ReactNode, useEffect, useRef, useState} from "react";
import {Portal} from "shared/ui/Portal/Portal";
import {useTheme} from "app/providers/ThemeProvider";

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
}

const ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {

    const {
        className,
        children,
        isOpen,
        onClose
    } = props

    const [isClosing, setIsClosing] = useState(false)
    const timeRef = useRef<ReturnType<typeof setTimeout>>()
    const {theme} = useTheme()

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

    const mods: Record<string, boolean | undefined> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
        [cls[theme]]: true,
    }

    useEffect(() => {

        const onKeyDownHandler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeHandler()
            }
        }

        if (isOpen) {
            window.addEventListener('keydown', onKeyDownHandler)
        }
        return () => {
            clearTimeout(timeRef.current)
            window.removeEventListener('keydown', onKeyDownHandler)
        }
    }, [])

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
